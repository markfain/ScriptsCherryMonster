import {Command} from "./Command";
import {HTTPClient} from "./HTTPClient";
import {Logger} from "./Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
declare var require: any;
declare var process: any;

export interface IToolboxCommandData {
    command: string;
    [commandArguments: string]: any
}

export abstract class ToolboxCommand extends Command {

    private TOOLBOX_PORT: number = 8333;
    private TOOLBOX_API: string = "/executeCommand";
    private TOOLBOX_URL: string = "http://localhost";
    private TOOLBOX_WORKING_DIR: File = Files.file("$SLATE_ROOT$/../toolbox");

    private getUrl(): string {
        return this.TOOLBOX_URL + ":" + this.TOOLBOX_PORT + this.TOOLBOX_API;
    }

    executeToolboxCommand(data: IToolboxCommandData, shouldRedirectOutput?: boolean) {
        let commandPrefix: string = "./toolbox.sh -headless -command " + data.command + " ";
        let commandArguments: string = "";
        for (let argument in data) {
            if (argument == "command") {
                continue;
            }
            commandArguments = commandArguments + argument + " " + data[argument] + " ";
        }
        this.finishTask();
        //TODO: add an option with output redirection

        this.execSync(commandPrefix + commandArguments, this.TOOLBOX_WORKING_DIR);

    }

    /*
    Old way to execute toolbox commands (using a web api - http)
    executeToolboxCommand(data:IToolboxCommandData){
        let res:any = HTTPClient.postSync(
            this.getUrl(),
            data,
        );
        if (res.statusCode == 200){
            if (res.body.type == "Error"){
                Logger.error("\n"+JSON.stringify(res.body) +"\n");
            }
            else {
                //Logger.log("\n"+JSON.stringify(res.body) +"\n");
            }
        }
        else {
            Logger.error(res.statusCode);
            Logger.error(JSON.stringify(res.error));
        }

        this.finishTask();
    }
    */

}