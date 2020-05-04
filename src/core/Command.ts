import {CLProgram} from "./CLProgram";
import {ProgressBar} from "./ProgressBar";
import {GenerateTypescriptClass} from "../commands/other/GenerateTypescriptClass";
import {Script} from "./Script";
import {Spinner} from "./Spinner";
import {isNullOrUndefined} from "util";
import {Logger} from "./Logger";

declare var require: any;
declare var process: any;

interface ICommandOption {
    flags: string;
    description: string;
}

export abstract class Command extends Script {

    protected command: any;

    protected commandArguments: string[] = [];

    private spinner;
    private spinningStarted;
    protected options: ICommandOption[] = [];
    private numberOfTasks: number = 0;

    constructor(name: string, description: string, numberOfTasks?: number) {
        super(name, description);
        this.numberOfTasks = numberOfTasks;
        this.validateCommand(); //Throws exception
        this.spinner = require('ora')(name);
        this.spinningStarted = false;
    }

    getOptions(): ICommandOption[] {
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

    getOption(optionName: string, commandOptions: any[]): any {
        let i = this.commandArguments.length;
        let option: any = commandOptions[i][optionName];
        //generally can be string or boolean, maybe can become a more especific type than any
        return option;
    }

    getArgument(argName: string, commandOptions: any[]): string {
        let argIndex = this.findInArguments(argName);
        if (argIndex > -1) {
            return commandOptions[argIndex];
        }
    }

    getAction(): (options) => any {
        return (...options: any[]): any => this.execute(options);
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
        //TODO: is this method needed?
        //this.setCommandArguments();
        //this.progressBar = new ProgressBar(this.name, this.numberOfTasks);
    }

    addArgument(argument: string): void {
        this.commandArguments.push(argument);
    }

    startSpinner() {
        this.spinner.start(this.name);
        this.spinningStarted = true;
    }

    stopSpinner() {
        this.spinner.stop();
    }

    startTask(taskName?: string): void {
        if (!this.spinningStarted) {
            this.spinner.start(this.name);
            this.spinningStarted = true;
        }
        //noinspection TypeScriptUnresolvedVariable
        if (taskName) {
            this.spinner.text = taskName;
        }

    }

    finishTask(success?: boolean, info?: string): void {
        if (!this.spinningStarted) {
            return;
        }
        if (success == isNullOrUndefined(success)) {
            //noinspection TypeScriptUnresolvedFunction
            this.spinner.succeed();
            this.spinner.stop();
        }
        if (success == true) {
            //noinspection TypeScriptUnresolvedFunction
            this.spinner.succeed(info);
            this.spinner.stop();
        } else {
            this.spinner.fail(info);
            this.spinner.stop();
        }
    }

    execute(options: any) {
        this.doExecute(options);
    }

    abstract doExecute(options: any);


}