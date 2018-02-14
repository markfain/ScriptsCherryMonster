import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Tasks} from "./Tasks";
declare var require: any;
declare var process: any;

export class StartTask extends Command {

    constructor() {
        super("starttask", "Starts a task", 3);
        this.commandArguments = [
            "id"
        ];
    }

    async doExecute(options: any) {
        let taskId:string = this.getArgument("id",options);
        this.startTask();
        let id = await Tasks.startTaskById(taskId);
        this.finishTask(true,  "Started task "+id);
    }

}