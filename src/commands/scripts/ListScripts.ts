import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
declare var require: any;
declare var process: any;

export class ListScripts extends Command {

    constructor() {
        super("listscripts", "lists all available scripts", 1);
    }

    execute(options: any): void {
        let scriptsListFile:File = Files.file("$SCM_SCRIPTS$", "scripts.json");
        Logger.log(TextFiles.read(scriptsListFile));

    }

}