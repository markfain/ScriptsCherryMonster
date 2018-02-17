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

export class AddNote extends Command {

    constructor() {
        super("addnote", "Adds a task", 1);
        this.commandArguments = [
            "id",
            "note"
        ];
    }

    doExecute(options: any): void {
        let note:string = this.getArgument("note",options);
        let taskId:string = this.getArgument("id",options);
        Spinner.start(this.name);
        Tasks.addNoteToTaskById(taskId, note);
        Spinner.stop("Added note to task " + taskId);
    }

}