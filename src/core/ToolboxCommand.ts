import {Command} from "./Command";
import {HTTPClient} from "./HTTPClient";
import {Logger} from "./Logger";
declare var require: any;
declare var process: any;

export interface IToolboxCommandData {
    command: string;
}

export abstract class ToolboxCommand extends Command {

    private TOOLBOX_PORT:number = 8333;
    private TOOLBOX_API:string = "/executeCommand";
    private TOOLBOX_URL:string = "http://localhost";

    private getUrl():string{
        return this.TOOLBOX_URL+":"+this.TOOLBOX_PORT+this.TOOLBOX_API;
    }

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
                Logger.log("\n"+JSON.stringify(res.body) +"\n");
            }
        }
        else {
            Logger.error(res.statusCode);
            Logger.error(JSON.stringify(res.error));
        }

        this.finishTask();
    }
}