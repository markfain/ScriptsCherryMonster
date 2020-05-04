import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";

export class WorksheetCheckText extends Script {

    resolveVariantName(fileName: string): string {
        fileName = fileName.replace("Worksheet02", "");
        fileName = fileName.replace("Worksheet", "");

        fileName = fileName.replace("_", "");
        fileName = fileName.replace("_GeneratedProblems", "");
        return fileName;

    }

    execute() {

        Files.setPlaceholder("$EPISODES$", "SlateRoot/Content/MathEpisodes/episodes/");
        Files.setPlaceholder("$PLAY$", "/Playground");
        let worksheetEpisodeFolder: File = Files.file("$EPISODES$", "Worksheet02");
        let generatedProblemsFolder: File = Files.file(worksheetEpisodeFolder, "parameters/problems");
        for (let file of generatedProblemsFolder.listFiles()) {
            let content: string = TextFiles.read(file);
            if (content.indexOf("TEXT_EXERCISE") > 0) {
                Logger.log(this.resolveVariantName(file.getName()));
            }
        }

    }
}

let WorksheetCheckTextInstance = new WorksheetCheckText("WorksheetCheckText", "check texts");
WorksheetCheckTextInstance.execute();

//@name:WorksheetCheckText
//@description:check texts