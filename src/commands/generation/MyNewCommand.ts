import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Logger} from "../../core/Logger";
declare var require: any;
declare var process: any;

export class MyNewCommand extends Command {

    constructor() {
        super("MyNewCommand", "cool command", 5);
    }

    action(options: any): void {
        Logger.shockTheUser("my new MyNewCommand");
        Files.file("$SLATE_ROOT");
        /*
            here is the actual action
            prompt the user for something:
            userPrompt
                .input("name", "Command Name:")
                .input("description", "Command Description:")
                .input("tasks", "Number of tasks:")
                .bind(this, this.handleAnswer);

        */
    }

}