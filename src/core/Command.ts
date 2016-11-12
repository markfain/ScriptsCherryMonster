import {CLProgram} from "./CLProgram";
import {ProgressBar} from "./ProgressBar";
declare var require: any;
declare var process: any;
export abstract class Command {

    private prog: any;
    protected command: any;
    protected name: string;
    protected commandArguments: string[] = [];
    protected description: string = "";
    private progressBar: ProgressBar;
    private options: string[] = [];
    private numberOfTasks: number = 0;

    constructor(name: string, description: string, numberOfTasks?: number) {
        this.name = name;
        this.description = description;
        this.numberOfTasks = numberOfTasks;

        this.validateCommand(); //Throws exception

    }

    getName() {
        return this.name;
    }

    getOptions() {
        return this.options;
    }

    validateCommand() {
        if (this.name.length == 0 || this.description.length == 0 || this.numberOfTasks <= 0) {
            throw new Error("Command validation failed for class" + this.constructor['name']);
        }
    }

    updateNumberOfTasks(newNumberOfTasks: number) {
        this.numberOfTasks = newNumberOfTasks;
        this.validateCommand();
    }

    incrementNumberOfTasks() {
        this.numberOfTasks = this.numberOfTasks + 1;
    }

    setProgram(program: CLProgram) {
        this.prog = program.getEngine();
        if (this.commandArguments.length == 0) {
            this.command = this.prog.command(this.getName());
        }
        else {
            let argumentsString: string = "";
            for (let i = 0; i < this.commandArguments.length; i++) {
                let argumentString = "<" + this.commandArguments[i] + ">";
                argumentsString = argumentsString + argumentString + " ";
            }
            this.command = this.prog.command(this.getName() + argumentsString);

        }
    }

    addOption(parameter: string, description: string) {
        let myRegexp = /--(\w+)/g;
        let options = myRegexp.exec(parameter);
        this.options.push(options[1]);
        this.command.option(parameter, description);
    }

    addAction(action: (...arg: any[]) => any) {
        this.command.action(action);
    }

    addDescription(desc: string) {
        this.command.description(desc);
    }

    doAddDescription() {
        this.addDescription(this.description);
    }

    finalize() {
        this.progressBar = new ProgressBar(this.name, this.numberOfTasks);
    }

    setArguments(argumentName: string, options: string[]) {
        let optionsString: string = "";
        for (let i = 0; i < options.length; i++) {
            optionsString = "[" + optionsString + "]" + " ";
        }
        this.command.arguments("<" + argumentName + ">" + optionsString);
    }

    finishTask() {
        this.progressBar.finishTask();
    }



    abstract doAddAction();

    abstract doAddOptions();

    abstract doSetArguments();
}