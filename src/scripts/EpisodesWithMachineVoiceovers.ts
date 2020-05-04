import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {Finder} from "../utils/Finder";
export class EpisodesWithMachineVoiceovers extends Script {
    execute() {


        let episodes = Files.file("$EPISODES$");
        for (let episode of episodes.listFiles()) {
            if (episode.isDirectory()) {

                let list:string[] = [];
                Finder.findFileInFolderStartingWith(episode, episode.getName(), list, (name:string)=>{ return name.endsWith("descriptor.ts")}, true)
                Finder.findFileInFolderStartingWith(episode, episode.getName(), list, (name:string)=>{ return name.endsWith("descriptor.js")}, true)
                for (let descriptorPath of list){
                    let text:string = TextFiles.read(Files.file(descriptorPath));
                    if (text.indexOf("enableMachineVoiceover")>0){
                        let allFiles:string[] = [];
                        Finder.findFileInFolderStartingWith(episode, episode.getName(), allFiles, (name:string)=>{ return name.endsWith(".js")}, true);
                        Finder.findFileInFolderStartingWith(episode, episode.getName(), allFiles, (name:string)=>{ return name.endsWith(".ts")}, true);
                        for (let filePath of allFiles){
                            let file = TextFiles.read(Files.file(filePath));
                            if (file.indexOf(".machineVoiceover")>0){
                                Logger.log(episode.getName());
                                break;
                            }
                        }
                    }
                }

            }
        }




    }
}

let EpisodesWithDependenciesInstance = new EpisodesWithMachineVoiceovers("EpisodesWithHumanVoiceovers", "lists episodes with human voiceover");
EpisodesWithDependenciesInstance.execute();

//@name:EpisodesWithMachineVoiceovers
//@description:lists episodes with dependencies