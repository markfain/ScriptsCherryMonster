import {CLProgram} from "../core/CLProgram";
import {Command} from "../core/Command";
import {Logger} from "../core/Logger";
declare var require:any;
declare var process:any;
export class TestCommand extends Command {

    constructor(){
        super();
        this.setName("exec")
    }

    doSetArguments(){};

    doAddOptions(){
        this.addOption("-e, --exec_mode <mode>", "Which exec mode to use");
    }

    doAddDescription(){
        this.addDescription("does something 1");
    }

    doAddAction(){
        this.addAction(
            (arg: string, options) : void => {
                Logger.highlight("oh my god");
            }
        )
    }
}