import {CLProgram} from "../core/CLProgram";
import {Command} from "../core/Command";
declare var require:any;
declare var process:any;
export class AnotherTestCommand extends Command {

    constructor(){
        super();
        this.setName("exec2")
    }

    doSetArguments(){};

    doAddOptions(){
        this.addOption("-e, --exec_mode <mode>", "Which exec mode to use");
    }

    doAddDescription(){
        this.addDescription("does something 2");
    }

    doAddAction(){
        this.addAction(
            (arg: string, options) : void => {
                console.log("executed2: "+arg+"   "+options);
                }
        )
    }
}