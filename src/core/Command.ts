import {CLProgram} from "./CLProgram";
declare var require:any;
declare var process:any;
export abstract class Command {

    private prog:any;
    private command:any;
    private name:string;
    private commandArguments:string[] = [];

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    setProgram(program:CLProgram) {
        this.prog = program.getEngine();
        if (this.commandArguments.length == 0) {
            this.command = this.prog.command(this.getName());
        }
        else {
            let argumentsString:string = "";
            for (let i = 0; i < this.commandArguments.length; i++) {
                let argumentString = "<" + this.commandArguments[i] + ">";
                argumentsString = argumentsString + argumentString + " ";
            }
            this.command = this.prog.command(this.getName() + argumentsString);

        }
    }

    addOption(parameter:string, description:string) {
        this.command.option(parameter, description);
    }

    addAction(action:(...arg:any[]) => any) {
        this.command.action(action);
    }

    addDescription(desc:string) {
        this.command.description(desc);
    }

    abstract doAddAction();

    abstract doAddDescription();

    abstract doAddOptions();

    abstract doSetArguments();
}