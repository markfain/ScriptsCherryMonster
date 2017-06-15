import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Finder} from "../utils/Finder";
export class CheckVoConventionInEpisodes extends Script {

    private namePredicate(str:string){
        //should start with vo
        if (!str.startsWith("vo_")){
            return false;
        }
        str = str.substring(0, str.lastIndexOf("."));
        //should not end with a language
        let languages:string[] = ["_es", "_es_ar", "_fr", "_he", "_de", "_pt", "_pt_br", "_ru", "fr_ca"];
        for (let language of languages){
            if (str.endsWith(language)){
                return false;
            }
        }
        return true;

    }


    execute() {

        let underVoiceoverCounter = 0;
        let underAudioCounter = 0;
        let underMainCounter = 0;
        let somewhereElseCounter = 0;


        Files.setPlaceholder("$EPISODES$", "SlateRoot/Content/MathEpisodes/episodes/");
        let episodesFolder: File = Files.file("$EPISODES$");
        let episodes: File[] = episodesFolder.listFiles();

        for (let episode of episodes) {
            let voFilePaths:string[] = [];
            Finder.findFileInFolderStartingWith(episode, "vo_", voFilePaths, this.namePredicate, false);
            if (voFilePaths.length>0){
                let voFilePath:string = voFilePaths[0];
                let voFile:File = Files.file(voFilePath);
                let lastIndexOf = voFilePath.lastIndexOf("/");
                let folderPath = voFilePath.substring(0, lastIndexOf);
                let folder:File = Files.file(folderPath);
                if (folder.getName()== "Voiceover"){

                    if (folder.getParentFile().getName()!="audio"){
                        Logger.highlight("parent is not audio! "+episode.getName() + " : "+ voFile.getAbsolutePath());
                        somewhereElseCounter++;
                        continue;
                    }
                    underVoiceoverCounter ++;
                }
                else if (folder.getName() == "Main"){
                    Logger.highlight("Under Main! "+episode.getName() + " : "+ voFile.getAbsolutePath());
                    underMainCounter++;
                }
                else if (folder.getName()== "audio"){
                    underAudioCounter++;
                }
                else {
                    Logger.log(episode.getName() + " : "+ voFile.getAbsolutePath());
                    somewhereElseCounter++;
                }
            }

        }
        Logger.warn("Under audio: "+underAudioCounter);
        Logger.warn("Under Main: "+underMainCounter);
        Logger.warn("Under Voiceover: "+underVoiceoverCounter);
        Logger.warn("Somewhere else: "+somewhereElseCounter);



    }
}

let CheckVoConventionInEpisodesInstance = new CheckVoConventionInEpisodes("CheckVoConventionInEpisodes", "checks vo convention in episodes");
CheckVoConventionInEpisodesInstance.execute();

//@name:CheckVoConventionInEpisodes
//@description:checks vo convention in episodes