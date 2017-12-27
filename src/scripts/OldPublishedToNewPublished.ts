import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class OldPublishedToNewPublished extends Script{

    /**
     * go over published folder, get all episodes that have a json but do not have a folder
     *
     * @returns {Array}
     */
    getRelevantEpisodes(publishedFolder:File):any {
        let relevantEpisodes = {};

        for (let file of publishedFolder.listFiles()){
            if (!file.isDirectory()){
                let episodeName = file.getName();
                let underScoreName = JavascriptUtils.camelCaseToUnderscoreSeparated(episodeName);
                let directory = Files.file(publishedFolder, underScoreName);
                if (file.getExtension().indexOf("json")>=0 && !directory.exists()){
                    relevantEpisodes[underScoreName] = episodeName;
                }
            }
        }
        return relevantEpisodes;
    }

    execute(){
        let publishedFolder:File = Files.file("$PLAY$", "publishedNative");
        let newPublishedFolder:File = Files.file("$PLAY$", "newPublishedNative");
        let relevantEpisodes = this.getRelevantEpisodes(publishedFolder);
        for (let episode in relevantEpisodes){
            Logger.log(relevantEpisodes[episode]);
            let targetEpisodeFolder = Files.file(newPublishedFolder, episode);
            let originalEpisodeFile:File = Files.file(publishedFolder, relevantEpisodes[episode]+".json");
            let originalEpisode = TextFiles.readJson(originalEpisodeFile);
            let cacheBuster = originalEpisode["cacheBuster"];
            if (!cacheBuster){
                let date = originalEpisode["uploadedOn"];
                date = JavascriptUtils.replaceAll(date, " ","");
                date = JavascriptUtils.replaceAll(date, ":", "");
                date = JavascriptUtils.replaceAll(date, "-", "");
                cacheBuster = date;
            }
            let targetEpisodeFile:File = Files.file(targetEpisodeFolder, episode+"_"+cacheBuster+".json");
            let targetPublishedFile = Files.file(targetEpisodeFolder, episode+"_published.json");
            Files.copyFile(originalEpisodeFile, targetEpisodeFile);

            //add a published.json with the latest
            let published = {
                "type": "published",
                "versions": [cacheBuster],
                "latest": cacheBuster
            };

            TextFiles.write(targetPublishedFile, published);
        }



    }
}

let OldPublishedToNewPublishedInstance = new OldPublishedToNewPublished("OldPublishedToNewPublished", "old way of publishing to new way of publishing episodes");
OldPublishedToNewPublishedInstance.execute();

//@name:OldPublishedToNewPublished
//@description:old way of publishing to new way of publishing episodes