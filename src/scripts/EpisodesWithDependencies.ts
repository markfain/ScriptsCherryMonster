import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class EpisodesWithDependencies extends Script {
    execute() {


        let episodes = Files.file("$EPISODES$");
        let count:number = 0;
        let allEpisodes:number = 0;
        for (let episode of episodes.listFiles()) {

            if (episode.isDirectory()) {
                let slateJson = Files.file(episode, ".slate.episode.json");
                if (slateJson.exists()) {
                    allEpisodes++;
                    let slateJsonContent;
                    try {
                        slateJsonContent = TextFiles.readJson(slateJson);
                    }
                    catch (e) {
                        //Logger.log(".slate.episode.json of "+episode.getName()+" is not a valid json");
                        continue;
                    }
                    let apiVersion = parseFloat(slateJsonContent.apiVersion);
                    if (apiVersion<=1.45){
                        count++;
                    }




                    let imports = slateJsonContent["imports"] || [];
                    for (let importLine of imports) {
                        if (importLine.indexOf("Bundle") >= 0) {
                            //Logger.log(episode.getName());
                            break;
                        }
                    }
                }
            }
        }

        Logger.log(count.toString());
        Logger.log(allEpisodes.toString());


    }
}

let EpisodesWithDependenciesInstance = new EpisodesWithDependencies("EpisodesWithDependencies", "lists episodes with dependencies");
EpisodesWithDependenciesInstance.execute();

//@name:EpisodesWithDependencies
//@description:lists episodes with dependencies