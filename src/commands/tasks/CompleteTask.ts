import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Tasks} from "./Tasks";
declare var require: any;
declare var process: any;

export class CompleteTask extends Command {

    constructor() {
        super("completetask", "Completes a task", 1);
        this.commandArguments = [
            "id"
        ];
    }

    async doExecute(options: any) {
        let taskId:string = this.getArgument("id",options);
        this.startTask();
        await Tasks.completeTaskById(taskId);
        this.finishTask(true, "Completed task "+taskId);
    }

}