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

    updateNumberOfTasks(newNumberOfTasks: number) {
        this.numberOfTasks = newNumberOfTasks;
        this.validateCommand();
    }

    incrementNumberOfTasks() {
        this.numberOfTasks = this.numberOfTasks + 1;
    }

    setProgram(program: CLProgram) {
        this.prog = program.getEngine();
        this.command = this.prog.command(this.getName());

    }

    addOption(parameter: string, description: string) {
        let myRegexp = /--(\w+)/g;
        let options = myRegexp.exec(parameter);
        this.options.push(options[1]);
        this.command.option(parameter, description);
    }

    addOptions(){
        this.doAddOptions();
    }

    addAction() {
        this.command.action(
            (options:any) => this.doAddAction(options)
        );
    }

    addDescription() {
        this.doAddDescription(this.description)
    }

    doAddDescription(desc:string) {
        this.command.description(desc);
    }

    private setCommandArguments(){
        let argumentsString:string = "";
        for (let i=0; i<this.commandArguments.length; i++){
            argumentsString = argumentsString + "<"+this.commandArguments[i]+ ">"+" ";
        }
        this.command.arguments(argumentsString);
    }

    finalize() {
        this.setCommandArguments();
        this.progressBar = new ProgressBar(this.name, this.numberOfTasks);
    }

    addArguments(){
        this.doAddArguments();
    }

    addArgument(argument:string){
        this.commandArguments.push(argument);
    }

    finishTask() {
        this.progressBar.finishTask();
    }

    abstract doAddArguments();

    abstract doAddOptions();

    abstract doAddAction(options);


}