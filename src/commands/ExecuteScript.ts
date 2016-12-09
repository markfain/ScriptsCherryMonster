import {Logger} from "../core/Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Prompt} from "../core/Prompt";
import {Command} from "../core/Command";
declare var require: any;
declare var process: any;

export class ExecuteScript extends Command {

    constructor() {
        super("executeScript", "Execute a script and hope it will work", 1);
        this.commandArguments = [
            "scriptName"
        ]
    }

    action(options: any): void {
        let scriptName = this.getArgument("scriptName", options);
        //TODO: how can I avoid compiling the whole project...?
        //TODO: what do to with subfolders...?
        this.execSync("tsc -p ./ --outDir ./dist");
        this.execSyncRedirectOutput("node ./dist/scripts/"+scriptName+".js");
    }

}