import {CLProgram} from "./CLProgram";
import {ProgressBar} from "./ProgressBar";
declare var require:any;
declare var process:any;
export abstract class Command {

    private prog:any;
    protected command:any;
    protected name:string;
    protected commandArguments:string[] = [];
    protected description:string = "";
    private progressBar:ProgressBar;

    constructor(name:string, description:string, numberOfTasks?:number){
        this.name = name;
        this.description = description;

        this.validateCommand(); //Throws exception
        this.progressBar = new ProgressBar(this.name, numberOfTasks);
    }

    getName() {
        return this.name;
    }

    validateCommand(){
        if (this.name.length == 0 || this.description.length == 0){
            throw new Error("command validation failed");
        }
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

    doAddDescription(){
        this.addDescription(this.description);
    }

    finishTask(){
        this.progressBar.finishTask();
    }

    abstract doAddAction();

    abstract doAddOptions();

    abstract doSetArguments();
}