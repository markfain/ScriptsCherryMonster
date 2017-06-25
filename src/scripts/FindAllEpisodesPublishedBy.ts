import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
export class FindAllEpisodesPublishedBy extends Script {
    execute() {
        Files.setPlaceholder("$DESKTOP$", "../Desktop/");
        let publishedEpisodesFolder: File = Files.file("$DESKTOP$", "PublishedEpisodes/native/");
        let output: File = Files.file("$DESKTOP$", "output.txt");
        let fileNames: string = "";
        for (let file of publishedEpisodesFolder.listFiles()) {
            if (file.isDirectory()) {
                continue;
            }
            let json = TextFiles.readJson(file);
            if (json && json["publishedBy"] && json["publishedBy"].toLowerCase().indexOf("yossi") >= 0) {
                fileNames += file.getName() + "\n";
            }
            if (json && json["publishedOn"] && json["publishedOn"].toLowerCase().indexOf("yossi") >= 0) {
                fileNames += file.getName() + "\n";
            }
        }
        TextFiles.write(output, fileNames);

    }
}

let FindAllEpisodesPublishedByInstance = new FindAllEpisodesPublishedBy("FindAllEpisodesPublishedBy", "find all episodes published by someone");
FindAllEpisodesPublishedByInstance.execute();

//@name:FindAllEpisodesPublishedBy
//@description:find all episodes published by someone