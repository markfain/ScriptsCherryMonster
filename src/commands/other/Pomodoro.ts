import {Logger} from "../../core/Logger";
import {Command} from "../../core/Command";
import {Prompt} from "../../core/Prompt";
declare var require: any;
declare var process: any;
declare var clearInterval;

export class Pomodoro extends Command {

    constructor() {
        super("starttomato", "Starts a tomato timer", 2);
    }

    doExecute(options: any): void {
        Logger.error("Not ready yet... Only starting");
    }

}