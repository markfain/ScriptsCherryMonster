import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
export class WorksheetVariantsDoNotMinify extends Script{
    execute(){
        Files.setPlaceholder("$EPISODES$", "SlateRoot/Content/MathEpisodes/episodes/");
        Files.setPlaceholder("$PLAY$", "/Playground");
        let worksheetEpisodeFolder:File = Files.file("$EPISODES$", "Worksheet");
        let generatedProblemsFolder:File = Files.file(worksheetEpisodeFolder, "src/common/problems");
        for (let file of generatedProblemsFolder.listFiles()){
            let content:string = TextFiles.read(file);
            let withDoNotMinifyTag = "//##DoNotMinify\n"+content;
            TextFiles.write(file, withDoNotMinifyTag, true);
        }
    }
}

let WorksheetVariantsDoNotMinifyInstance = new WorksheetVariantsDoNotMinify("WorksheetVariantsDoNotMinify", "add the DoNotMinifyTag to all variants");
WorksheetVariantsDoNotMinifyInstance.execute();

//@name:WorksheetVariantsDoNotMinify
//@description:add the DoNotMinifyTag to all variants