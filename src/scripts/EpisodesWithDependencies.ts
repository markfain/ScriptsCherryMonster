import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class EpisodesWithDependencies extends Script {
    execute() {


        let episodes = Files.file("$EPISODES$");
        for (let episode of episodes.listFiles()) {
            if (episode.isDirectory()) {
                let slateJson = Files.file(episode, ".slate.episode.json");
                if (slateJson.exists()) {
                    let slateJsonContent;
                    try {
                        slateJsonContent = TextFiles.readJson(slateJson);
                    }
                    catch (e) {
                        Logger.log(".slate.episode.json of "+episode.getName()+" is not a valid json");
                        continue;
                    }

                    let imports = slateJsonContent["imports"] || [];
                    for (let importLine of imports) {
                        if (importLine.indexOf("Bundle") >= 0) {
                            Logger.log(episode.getName());
                            break;
                        }
                    }
                }
            }
        }


    }
}

let EpisodesWithDependenciesInstance = new EpisodesWithDependencies("EpisodesWithDependencies", "lists episodes with dependencies");
EpisodesWithDependenciesInstance.execute();

//@name:EpisodesWithDependencies
//@description:lists episodes with dependencies