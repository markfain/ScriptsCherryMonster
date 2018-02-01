import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Task} from "./Task";
import {Tasks} from "./Tasks";
declare var require: any;
declare var process: any;

export class AddTask extends Command {

    constructor() {
        super("addtask", "Adds a task", 1);
        this.commandArguments = [
            "name"
        ];
        this.options = [
            {
                flags: "-d, --description <description>",
                description: "description"
            }
        ]
    }

    execute(options: any): void {
        let taskName:string = this.getArgument("name",options);
        let description:string = this.getOption("description",options);
        let task = new Task(taskName, description);
        Tasks.addTask(task);

    }

}