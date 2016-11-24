import {Logger} from "../core/Logger";
import {Command} from "../core/Command";
declare var require: any;
declare var process: any;

export class ShockTheUser extends Command {

    constructor() {
        super("ShockTheUser", "A command that shocks the user and tests a few aspects of the SCM", 20);
    }

    doAddArguments(): void {
        //thiss.addArgument("argName");
    }

    doAddOptions(): void {
        //this.addOption("-0, --option <option>", "A command option");
    }

    doAddAction(options: any): void {

        let command:Command = this;
        let counter = 0;
        var timer = setInterval(function () {
            counter++;
            command.finishTask();
            if (counter == 20){
                Logger.shockTheUser("SjknanIJSIDNIU hDsuh DuI SHD UIhIuISh IUHSIuI HSIuFH IUhFIsuH IUf UISFH IUfh IUH uFIHuI H HIsuFH s ");
                clearInterval(timer);
            }
        }, 200);






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