import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class DiscoverPublishedEpisodes extends Script {

    loadEpisodeList(): string[] {
        let episodes: File = Files.file("$PLAY$", "episodeList.txt");
        return TextFiles.readLines(episodes);
    }

    getApiVersionOfLatestPublishedVersion(episodeFolder: File) {
        let episodeName = episodeFolder.getName();
        let publishedFile = Files.file(episodeFolder, episodeName + "_published.json");
        let publishedJson = TextFiles.readJson(publishedFile);
        let episodeFile = Files.file(episodeFolder, episodeName + "_" + publishedJson["latest"] + ".json");
        let episodeJson = TextFiles.readJson(episodeFile);
        return episodeJson["apiVersion"];
    }

    getNameOfLatestPublishedVersion(episodeFolder: File) {
        let episodeName = episodeFolder.getName();
        let publishedFile = Files.file(episodeFolder, episodeName + "_published.json");
        let publishedJson = TextFiles.readJson(publishedFile);
        let episodeFile = Files.file(episodeFolder, episodeName + "_" + publishedJson["latest"] + ".json");
        let episodeJson = TextFiles.readJson(episodeFile);
        return episodeJson["name"];
    }

    getPublishingDateOfLatestPublishedVersion(episodeFolder: File) {
        let episodeName = episodeFolder.getName();
        let publishedFile = Files.file(episodeFolder, episodeName + "_published.json");
        let publishedJson = TextFiles.readJson(publishedFile);
        let latest = publishedJson["latest"];
        let month:string = latest.substring(2, 4);
        let day:string = latest.substring(4, 6);
        let year:string = latest.substring(0, 2);
        return {day: day, month: month, year:year};
    }

    isRelevantEpisode(episodeFolder: File) {
        let version:string;
        try{
            version = this.getApiVersionOfLatestPublishedVersion(episodeFolder);
        }
        catch(e){

            Logger.log("File is problematic "+episodeFolder.getName() +" "+e);
            return false;
        }

        let versionFloat = parseFloat(version);
        if (versionFloat == 1.16) {
            return true;
        }
        return false;
    }

    execute() {
        let publishedWebFolder: File = Files.file("$SLATE_ROOT$", "Temp/PublishedEpisodes/web/PublishedEpisodes/web");
        for (let file of publishedWebFolder.listFiles()) {
            if (file.isDirectory()) {
                if (this.isRelevantEpisode(file)) {
                   Logger.log(this.getNameOfLatestPublishedVersion(file));
                }
            }
        }


    }
}

let DiscoverPublishedEpisodesInstance = new DiscoverPublishedEpisodes("DiscoverPublishedEpisodes", "discover the episodes that have a published version");
DiscoverPublishedEpisodesInstance.execute();

//@name:DiscoverPublishedEpisodes
//@description:discover the episodes that have a published version