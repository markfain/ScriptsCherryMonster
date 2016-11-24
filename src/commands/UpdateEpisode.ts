import {ToolboxCommand, IToolboxCommandData} from "../core/ToolboxCommand";
declare var require: any;
declare var process: any;

export class UpdateEpisode extends ToolboxCommand {

    constructor() {
        super("UpdateEpisode", "Update an episode using the toolbox", 4);
    }

    doAddArguments(): void {
        //thiss.addArgument("argName");
    }

    doAddOptions(): void {
        this.addOption("-ep, --episode <episode>", "The episode name to update");
    }
    doAddAction(options: any): void {

        let dir = this.getCurrentDir();

        let updateDependenciesCommand:IToolboxCommandData = {
            command: "UpdateDependenciesCommand",
            episodeFolder: dir.toString(),
            useExplodedApiVersion: "true",
            configFileName: "WebPacking.json",
            outputFilename: "gen/\$Dependencies.js"
        };

        this.executeToolboxCommand(updateDependenciesCommand);

        /*
         curl http://localhost:8333/executeCommand --data "command=UpdateDependenciesCommand&episodeFolder=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&useExplodedApiVersion=true&configFileName=WebPacking.json&outputFilename=gen/\$Dependencies.js"
         curl http://localhost:8333/executeCommand --data "command=UpdateDependenciesCommand&episodeFolder=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&useExplodedApiVersion=true&configFileName=WebPacking.json&outputFilename=Dependencies.js"
         curl http://localhost:8333/executeCommand --data "command=UpdateResourcesCommand&episodeFolder=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&useExplodedApiVersion=true&configFileName=WebPacking.json&outputFilename=gen/\$Resources.js"
         curl http://localhost:8333/executeCommand --data "command=UpdateResourcesCommand&episodeFolder=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&useExplodedApiVersion=true&configFileName=WebPacking.json&outputFilename=Resources.js"
         curl http://localhost:8333/executeCommand --data "command=UpdateResourcesCommand&episodeFolder=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&useExplodedApiVersion=true&configFileName=NativePacking.json&outputFilename=gen/\$NativeResources.js"
         curl http://localhost:8333/executeCommand --data "command=UpdateResourcesCommand&episodeFolder=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&useExplodedApiVersion=true&configFileName=NativePacking.json&outputFilename=NativeResources.js"
         curl http://localhost:8333/executeCommand --data "command=UpdateEpisodeCommand&targetFolderPath=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&native=true"
         */

        //this.executeToolboxCommand();

        /*
            here is the actual action


            prompt the user for something:
            userPrompt
                .input("name", "Command Name:")
                .input("description", "Command Description:")
                .input("tasks", "Number of tasks:")
                .bind(this, this.handleAnswer);

        */
    }

}