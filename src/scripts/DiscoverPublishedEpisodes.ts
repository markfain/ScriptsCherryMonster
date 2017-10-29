import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class DiscoverPublishedEpisodes extends Script{

    extractEpisodeName(directory:File){
        for (let file of directory.listFiles()){
            if (file.getName().indexOf("published")>=0 || file.getExtension().indexOf("json")<0){
                continue;
            }
            else {
                let json:any = TextFiles.readJson(file);
                return json["name"];
            }
        }
    }

    execute(){
        let publishedWebFolder:File = Files.file("$PLAY$", "published");
        for (let file of publishedWebFolder.listFiles()){
            if (file.isDirectory()){
                Logger.log(this.extractEpisodeName(file));
            }
        }


    }
}

let DiscoverPublishedEpisodesInstance = new DiscoverPublishedEpisodes("DiscoverPublishedEpisodes", "discover the episodes that have a published version");
DiscoverPublishedEpisodesInstance.execute();

//@name:DiscoverPublishedEpisodes
//@description:discover the episodes that have a published version