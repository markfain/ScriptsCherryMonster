import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class PublishedEpisodesUtils {

    private static PUBLISHED_SUFFIX = "_published.json";
    private static LATEST_CACHEBUSTER_PROPERTY_NAME = "latest";
    private static API_VERSION_PROPERTY_NAME = "apiVersion";
    private static NAME_PROPERTY_NAME = "name";

    getLatestEpisodeJson(episodeFolder:File){
        let episodeName = episodeFolder.getName();
        let publishedFile = Files.file(episodeFolder, episodeName + PublishedEpisodesUtils.PUBLISHED_SUFFIX);
        let publishedJson = TextFiles.readJson(publishedFile);
        let episodeFile = Files.file(episodeFolder, episodeName+"_"+
            publishedJson[PublishedEpisodesUtils.LATEST_CACHEBUSTER_PROPERTY_NAME]+".json");
        let episodeJson = TextFiles.readJson(episodeFile);
        return episodeJson;
    }

    getApiVersionOfLatestPublishedVersion(episodeFolder:File){
        let episodeJson = this.getLatestEpisodeJson(episodeFolder);
        return episodeJson[PublishedEpisodesUtils.API_VERSION_PROPERTY_NAME];
    }

    getNameOfLatestPublishedVersion(episodeFolder:File){
        let episodeJson = this.getLatestEpisodeJson(episodeFolder);
        return episodeJson[PublishedEpisodesUtils.NAME_PROPERTY_NAME];
    }





}