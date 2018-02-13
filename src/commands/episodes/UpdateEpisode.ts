import {ToolboxCommand, IToolboxCommandData} from "../../core/ToolboxCommand";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {Logger} from "../../core/Logger";
declare var require: any;
declare var process: any;

interface IUpdateEpisodeData extends IToolboxCommandData {
    episodeFolder: string;
    useExplodedApiVersion: string;
    configFileName: string;
    outputFilename: string;
}

export class UpdateEpisode extends ToolboxCommand {

    constructor() {
        super("updateEpisode", "Update an episode using the toolbox", 7);
        this.options = [
            {
                flags: "-e, --episode <episode>",
                description: "The episode name to update"
            }
        ]
    }

    /**
     *
     * returns error string
     * @param episodeDir
     */
    private validateEpisodeDir(episodeDirPath: string): string {
        if (episodeDirPath == ""){
            return "Episode Folder does not exist";
        }
        let episodeFolder: File = Files.file(episodeDirPath);
        if (!episodeFolder.exists()) {
            return "Episode Folder does not exist: "+episodeFolder.getAbsolutePath();
        }
        let episodeMetadata: File = Files.file(episodeDirPath, ".slate.episode.json");
        if (!episodeMetadata.exists()) {
            return episodeDirPath + " Is not an episode path (missing .slate.episode.json)";
        }
        return "";
    }

    private getEpisodeDirPath(episode): string {
        let episodeDir: string;
        if (episode) {
            let episodeFolder: File = Files.file("$EPISODES$", episode);
            if (!episodeFolder.exists()) {
                episodeDir = episodeFolder.getAbsolutePath();
            }
            else {
                episodeDir = episodeFolder.getAbsolutePath();
            }
        }
        else {
            episodeDir = this.getCurrentDir();
        }
        return episodeDir;
    }

    doExecute(options: any): void {
        let episodeDir: string = this.getEpisodeDirPath(options.episode);
        let error = this.validateEpisodeDir(episodeDir);
        if (error != "") {
            Logger.error(error);
            return;
        }

        let updateDependenciesData: IUpdateEpisodeData = {
            command: "UpdateDependenciesCommand",
            episodeFolder: episodeDir.toString(),
            useExplodedApiVersion: "true",
            configFileName: "WebPacking.json",
            outputFilename: "Dependencies.js"
        };

        let updateDependenciesDataGen: IUpdateEpisodeData = {
            command: "UpdateDependenciesCommand",
            episodeFolder: episodeDir.toString(),
            useExplodedApiVersion: "true",
            configFileName: "WebPacking.json",
            outputFilename: "gen/\$Dependencies.js"
        };

        let updateResourcesDataGen: IUpdateEpisodeData = {
            command: "UpdateResourcesCommand",
            episodeFolder: episodeDir.toString(),
            useExplodedApiVersion: "true",
            configFileName: "WebPacking.json",
            outputFilename: "gen/\$Resources.js"
        };

        let updateResourcesData: IUpdateEpisodeData = {
            command: "UpdateResourcesCommand",
            episodeFolder: episodeDir.toString(),
            useExplodedApiVersion: "true",
            configFileName: "WebPacking.json",
            outputFilename: "Resources.js"
        };

        let updateResourcesDataNative: IUpdateEpisodeData = {
            command: "UpdateResourcesCommand",
            episodeFolder: episodeDir.toString(),
            useExplodedApiVersion: "true",
            configFileName: "NativePacking.json",
            outputFilename: "NativeResources.js"
        };

        let updateResourcesDataNativeGen: IUpdateEpisodeData = {
            command: "UpdateResourcesCommand",
            episodeFolder: episodeDir.toString(),
            useExplodedApiVersion: "true",
            configFileName: "NativePacking.json",
            outputFilename: "gen/\$NativeResources.js"
        };

        let updateEpisodeNative: IToolboxCommandData = {
            command: "UpdateEpisodeCommand",
            targetFolderPath: episodeDir.toString(),
            native: "true"
        };

        this.executeToolboxCommand(updateDependenciesData);
        this.executeToolboxCommand(updateDependenciesDataGen);
        this.executeToolboxCommand(updateResourcesData);
        this.executeToolboxCommand(updateResourcesDataGen);
        this.executeToolboxCommand(updateResourcesDataNative);
        this.executeToolboxCommand(updateResourcesDataNativeGen);
        this.executeToolboxCommand(updateEpisodeNative);
    }

}