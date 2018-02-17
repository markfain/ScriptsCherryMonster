import {Command} from "../../core/Command";
import {Tasks} from "./Tasks";
import {Spinner} from "../../core/Spinner";
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

    async doExecute(options: any): Promise<any> {
        let taskId:string = this.getArgument("id",options);
        Spinner.start(this.name);
        await Tasks.removeTaskById(taskId, this.getOption("ignoreAsana", options));
        Spinner.stop("Removed task "+taskId);
    }

}