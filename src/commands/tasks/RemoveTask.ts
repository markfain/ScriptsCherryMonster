import {Command} from "../../core/Command";
import {Tasks} from "./Tasks";
declare var require: any;
declare var process: any;

export class RemoveTask extends Command {

    constructor() {
        super("removetask", "Removes a task", 1);
        this.commandArguments = [
            "id"
        ];
        this.options = [
            {
                flags: "-ignoreAsana, --ignoreAsana",
                description: "remove only locally"
            }
        ]
    }

    doExecute(options: any): void {
        let taskId:string = this.getArgument("id",options);

        Tasks.removeTaskById(taskId, this.getOption("ignoreAsana", options));
    }

}