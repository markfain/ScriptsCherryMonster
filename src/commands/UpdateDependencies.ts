import {ToolboxCommand, IToolboxCommandData} from "../core/ToolboxCommand";
declare var require:any;
declare var process:any;
interface IUpdateEpisode extends IToolboxCommandData{
    episodeFolder:string;
    useExplodedApiVersion:string;
    configFileName:string;
    outputFilename:string;
}
export class UpdateDependencies extends ToolboxCommand {

    constructor() {
        super("UpdateDependencies", "Test Command - actually updates toolbox", 5);

    }

    getUpdateData(episodeName:string):IUpdateEpisode{
        var commandData:IUpdateEpisode = {
            command: "UpdateDependencies",
            episodeFolder: "/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/"+episodeName,
            useExplodedApiVersion: "true",
            configFileName: "WebPacking.json",
            outputFilename:"gen/\$Dependencies.js"
        };
        return commandData
    }

    doAddAction() {
        this.addAction(
            (options: any): void => {
                let data:IUpdateEpisode=this.getUpdateData(options.episodeName);
                for (let i=0; i<5; i++){
                    this.executeToolboxCommand(data);
                }
            }
        )
    }

    doAddOptions() {
        this.addOption("-e, --episodeName <episode>", "Episode Name");
    }

    doSetArguments(){

    }
}