import {CLProgram} from "./CLProgram";
import {ProgressBar} from "./ProgressBar";
import {GenerateTypescriptClass} from "../commands/generation/GenerateTypescriptClass";
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

    updateNumberOfTasks(newNumberOfTasks: number): void {
        this.numberOfTasks = newNumberOfTasks;
        this.validateCommand();
    }

    incrementNumberOfTasks(): void {
        this.numberOfTasks = this.numberOfTasks + 1;
    }

    setProgram(program: CLProgram): void {
        this.prog = program.getEngine();
        this.command = this.prog.command(this.getName());

    }

    addOption(parameter: string, description: string): void {
        let myRegexp = /--(\w+)/g;
        let options: any = myRegexp.exec(parameter);
        this.options.push(options[1]);
        this.command.option(parameter, description);
    }

    addOptions(): void {
        this.doAddOptions();
    }

    addAction(): void {
        this.command.action(
            (options: any): any => this.doAddAction(options)
        );
    }

    addDescription(): void {
        this.doAddDescription(this.description)
    }

    doAddDescription(desc: string): void {
        this.command.description(desc);
    }

    private setCommandArguments(): void {
        let argumentsString: string = "";
        for (let i = 0; i < this.commandArguments.length; i++) {
            argumentsString = argumentsString + "<" + this.commandArguments[i] + ">" + " ";
        }
        this.command.arguments(argumentsString);
    }

    finalize(): void {
        this.setCommandArguments();
        this.progressBar = new ProgressBar(this.name, this.numberOfTasks);
    }

    addArguments(): void {
        this.doAddArguments();
    }

    addArgument(argument: string): void {
        this.commandArguments.push(argument);
    }

    finishTask(): void {
        this.progressBar.finishTask();
    }

    execSync(command: string): any {
        let execSync = require("child_process").execSync;
        return execSync(command);
    }

    getCurrentDir(): string {
        let dir: string = this.execSync("pwd");
        return dir;
    }

    abstract doAddArguments(): void;

    abstract doAddOptions(): void;

    abstract doAddAction(options: any): void;


}