import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Task} from "./Task";
import {Tasks} from "./Tasks";
import {Spinner} from "../../core/Spinner";
declare var require: any;
declare var process: any;

export class AddTaskNote extends Command {

    constructor() {
        super("tasknote", "Adds a task", 1);
        this.commandArguments = [
            "id",
            "note"
        ];
    }

    async doExecute(options: any): Promise<any> {
        let note:string = this.getArgument("note",options);
        let taskId:string = this.getArgument("id",options);
        Spinner.start(this.name);
        await Tasks.addNoteToTaskById(taskId, note);
        Spinner.stop("Added note to task " + taskId);
    }

}