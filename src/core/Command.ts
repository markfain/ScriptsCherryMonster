import {CLProgram} from "./CLProgram";
import {ProgressBar} from "./ProgressBar";
import {GenerateTypescriptClass} from "../commands/generation/GenerateTypescriptClass";
declare var require: any;
declare var process: any;

interface ICommandOption {
    flags: string;
    description: string;
}

export abstract class Command {

    protected command: any;
    protected name: string;
    protected commandArguments: string[] = [];
    protected description;
    private progressBar: ProgressBar;
    protected options: ICommandOption[] = [];
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

    getOptions():ICommandOption[] {
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

    findInArguments(argName: string): number {
        for (let i = 0; i < this.commandArguments.length; i++) {
            if (this.commandArguments[i] == argName) {
                return i;
            }
        }
        return -1;
    }

    getOption(optionName: string, commandOptions: any[]): string {
        let i = this.commandArguments.length;
        let option: any = commandOptions[i][optionName];
        if (typeof option == "boolean") {
            option.toString();
        }
        else {
            return option;
        }
    }

    getArgument(argName: string, commandOptions: any[]): string {
        let argIndex = this.findInArguments(argName);
        if (argIndex > -1) {
            return commandOptions[argIndex];
        }
    }

    getAction(): (options)=>any {
        return (...options: any[]): any => this.action(options)
    }

    getDescription(): string {
        return this.description
    }

    getCommandArguments(): string {
        let argumentsString: string = "";
        for (let i = 0; i < this.commandArguments.length; i++) {
            argumentsString = argumentsString + "<" + this.commandArguments[i] + ">" + " ";
        }
        return argumentsString;
    }

    finalize(): void {
        //this.setCommandArguments();
        this.progressBar = new ProgressBar(this.name, this.numberOfTasks);
    }

    addArgument(argument: string): void {
        this.commandArguments.push(argument);
    }

    finishTask(): void {
        this.progressBar.finishTask();
    }

    finishTasks(tasks: number): void {
        this.progressBar.finishTasks(tasks);
    }

    execSyncRedirectOutput(command:string):any{
        let execSync = require("child_process").execSync;
        return execSync(command, {stdio:[0,1,2]});
    }

    execSync(command: string): any {
        let execSync = require("child_process").execSync;
        return execSync(command, function(){

        });
    }

    getCurrentDir(): string {
        let dir: string = this.execSync("pwd").toString();
        return dir.replace(/^\s+|\s+$/g, '');
    }

    abstract action(...options: any[]): void;


}