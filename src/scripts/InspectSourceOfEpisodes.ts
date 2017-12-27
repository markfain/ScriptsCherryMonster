import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class InspectSourceOfEpisodes extends Script{

    inspectSourceOfFolder(file:File, episode:File){
        if (file.isDirectory()){
            for (let inFile of file.listFiles()){
                this.inspectSourceOfFolder(inFile, episode);
            }
        }
        if (file.getExtension().indexOf("js")<0) {
            return;
        }
        let text = TextFiles.read(file);
        if (text.indexOf(".loopSound(")>0){
            Logger.log(episode.getName());
        }
    }

    execute(){

        let episodes:File = Files.file("$EPISODES$");
        for (let episode of episodes.listFiles()){
            this.inspectSourceOfFolder(episode, episode);
        }


    }
}

let InspectSourceOfEpisodesInstance = new InspectSourceOfEpisodes("InspectSourceOfEpisodes", "inspect source of episodes");
InspectSourceOfEpisodesInstance.execute();

//@name:InspectSourceOfEpisodes
//@description:inspect source of episodes