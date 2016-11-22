import {Command} from "../core/Command";
import {Logger} from "../core/Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Prompt} from "../core/Prompt";
declare var require: any;
declare var process: any;

export class MyCommand extends Command {

    constructor() {
        super("MyCommand", "my second generated command", 3);
    }

    doAddArguments(): void {
        //thiss.addArgument("argName");
    }

    doAddOptions(): void {
        //this.addOption("-0, --option <option>", "A command option");
    }

    doAddAction(options: any): void {
        Logger.shockTheUser("oh my god, this is my new command");
    }



}