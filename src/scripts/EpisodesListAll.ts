import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class EpisodesListAll extends Script{
    execute(){
        let episodes = Files.file("$EPISODES$");
        let episodeList = [];
        for (let episode of episodes.listFiles()) {
            if (episode.isDirectory()) {
                let slateJson = Files.file(episode, ".slate.episode.json");
                if (slateJson.exists()) {
                    episodeList.push(episode);
                }

                TextFiles.write(Files.file("$SLATE_ROOT$", "allEpisodes.json"), {
                    "episodeNames": episodeList
                })
            }
        }
    }
}

let EpisodesListAllInstance = new EpisodesListAll("EpisodesListAll", "lists all episodes");
EpisodesListAllInstance.execute();

//@name:EpisodesListAll
//@description:lists all episodes