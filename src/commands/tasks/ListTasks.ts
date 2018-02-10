import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Tasks} from "./Tasks";
declare var require: any;
declare var process: any;

export class ListTasks extends Command {

    constructor() {
        super("listtasks", "lists tasks", 1);
        this.options = [
            {
                flags: "-c, --completed",
                description: "completed"
            },
            {
                flags: "-g, --group <group>",
                description: "group name"
            }
        ];
        //TODO: add listing tasks options
    }

    execute(options: any): void {
       let listCompletedTasks:string = this.getOption("completed",options);
       let group:string = this.getOption("group",options);
       Tasks.listTasks(listCompletedTasks, group);
    }

}