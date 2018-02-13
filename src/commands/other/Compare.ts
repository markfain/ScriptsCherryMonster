import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
declare var require: any;
declare var process: any;

export class Compare extends Command {

    constructor() {
        super("compare", "compares two files using Meld tool", 1);
        this.commandArguments = [
            "file1",
            "file2"
        ];
    }

    doExecute(options: any): void {
        //let meld:File = Files.file("/Applications/Meld.app");
        //No support for this because Files.file needs to support path without home
        let meldPath = "/Applications/Meld.app"
        Logger.log("Happy comparing...");
        //TODO: allow a file like $SLATE_ROOT$/...
        let file1:string = this.getArgument("file1",options);
        let file2:string = this.getArgument("file2",options);
        this.execSyncRedirectOutput("open -a "+meldPath+" --args "+file1+" "+file2);
    }

}