import {Logger} from "../../core/Logger";
import {Command} from "../../core/Command";
import {Prompt} from "../../core/Prompt";
declare var require: any;
declare var process: any;
declare var clearInterval;

export class ShockTheUser extends Command {

    constructor() {
        super("shocktheuser", "A command that shocks the user and tests a few aspects of the SCM", 20);
    }

    handleAnswer(answer:any): void {
        if (!answer.shock){
            return;
        }
        let command: Command = this;
        let counter = 0;
        var timer = setInterval(function () {
            counter++;
            command.finishTask();
            if (counter == 20) {
                Logger.shockTheUser("SjknanIJSIDNIU hDsuh DuI SHD UIhIuISh IUHSIuI HSIuFH IUhFIsuH IUf UISFH IUfh IUH uFIHuI H HIsuFH s ");
                clearInterval(timer);
            }
        }, 200);
    }

    execute(options: any): void {

        let userPrompt = new Prompt();
        userPrompt.confirm("shock", "Would you like to be shocked?").bind(this, this.handleAnswer);

    }

}