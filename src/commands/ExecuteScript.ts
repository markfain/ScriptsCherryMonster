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

    execute(options: any): void {
        let scriptName = this.getArgument("scriptName", options);
        //TODO: how can I avoid compiling the whole project...?
        //TODO: what do to with subfolders...?
        //TODO: make this not dependent on path
        //this.execSync("tsc /Users/markfainstein/Dev/ScriptsCherryMonster/src/scripts/"+scriptName+".ts"+" --outDir ./Users/markfainstein/Dev/ScriptsCherryMonster/dist");
        this.execSync("tsc -p /Users/markfainstein/Dev/ScriptsCherryMonster/ --outDir ./Users/markfainstein/Dev/ScriptsCherryMonster/dist");

        this.execSyncRedirectOutput("node /Users/markfainstein/Dev/ScriptsCherryMonster/dist/scripts/"+scriptName+".js");
    }

}