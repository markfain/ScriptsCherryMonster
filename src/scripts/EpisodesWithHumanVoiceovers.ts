import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class EpisodesWithHumanVoiceovers extends Script {
    execute() {

        let localeNames:string[] = [];
        let episodes = Files.file("$EPISODES$");
        for (let episode of episodes.listFiles()) {
            if (episode.isDirectory()) {
                let slateJson = Files.file(episode, ".slate.episode.json");
                if (slateJson.exists()) {
                    let voiceoverFolder:File = Files.file(episode, "audio/voiceover");
                    if (voiceoverFolder.exists()){
                        Logger.log(episode.getName());
                        let folders:File[] = voiceoverFolder.listFiles((file:File)=>{return true});
                        for (let folder of folders){
                            if (folder.isDirectory() && localeNames.indexOf(folder.getName())<0){
                                localeNames.push(folder.getName());
                            }
                        }
                    }
                    voiceoverFolder = Files.file(episode, "audio/Voiceover");
                    if (voiceoverFolder.exists()){
                        Logger.log(episode.getName());

                        Logger.log(episode.getName());
                        let folders:File[] = voiceoverFolder.listFiles((file:File)=>{return true});
                        for (let folder of folders){
                            if (folder.isDirectory() && localeNames.indexOf(folder.getName())<0){
                                localeNames.push(folder.getName());
                            }
                        }

                    };
                }
            }
        }
        Logger.log("Locales: ");
        for (let locale of localeNames){
            Logger.log(locale);
        }


    }
}

let EpisodesWithDependenciesInstance = new EpisodesWithHumanVoiceovers("EpisodesWithHumanVoiceovers", "lists episodes with human voiceover");
EpisodesWithDependenciesInstance.execute();

//@name:EpisodesWithHumanVoiceovers
//@description:lists episodes with dependencies