import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Tasks} from "./Tasks";
declare var require: any;
declare var process: any;

export class PrioritizeTask extends Command {

    constructor() {
        super("prioritizetask", "prioritize a task", 1);
        this.commandArguments = [
            "id", "priority"
        ];
    }

    doExecute(options: any): void {
        let taskId:string = this.getArgument("id",options);
        let taskPriotity:number = parseInt(this.getArgument("priority",options));
        Tasks.setPriority(taskId, taskPriotity);
    }

}