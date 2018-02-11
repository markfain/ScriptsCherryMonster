import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Tasks} from "./Tasks";
declare var require: any;
declare var process: any;

export class PauseTask extends Command {

    constructor() {
        super("pausetask", "Pauses a task", 1);
        this.commandArguments = [
            "id"
        ];
    }

    execute(options: any): void {
        let taskId:string = this.getArgument("id",options);
        Tasks.pauseTaskById(taskId);
    }

}