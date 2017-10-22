import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class FilterPackagesJson extends Script{
    execute(){
        let packagesJsonFile:File = Files.file("$PLAY$", "packages.json");
        let packagesJson = TextFiles.readJson(packagesJsonFile);
        let relevantEpisodes = {};
        for (let episode of packagesJson["packages"]){
            if (parseFloat(episode["infraVersion"])<1.10){
                let episodeName = episode["path"].split("/");
                relevantEpisodes[episodeName[episodeName.length-1]] = parseFloat(episode["infraVersion"]);
            }
        }
        TextFiles.write(Files.file("$PLAY$", "nativeEpisodesUnder110.json"), relevantEpisodes);
    }
}

let FilterPackagesJsonInstance = new FilterPackagesJson("FilterPackagesJson", "filter packages json ");
FilterPackagesJsonInstance.execute();

//@name:FilterPackagesJson
//@description:filter packages json 