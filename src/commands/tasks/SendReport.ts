import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Task} from "./Task";
import {Tasks} from "./Tasks";
import {Reports} from "./Reports";
declare var require: any;
declare var process: any;

export class SendReport extends Command {

    constructor() {
        super("sendreport", "Sends report via mail", 1);
    }

    doExecute(options: any): void {
        Reports.sendReport();

    }

}