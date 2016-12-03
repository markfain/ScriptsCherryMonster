import {Command} from "./Command";
import * as Commander from 'commander';
declare var require: any;
declare var process: any;
export class CLProgram {

    private commander: any;
    private commands:Command[] = [];

    constructor() {
        this.commander = Commander;
        this.addDescription();

    }

    addAutoComplete(): void {

        let commands:string[] = [];
        for (let command of this.commands){
            commands.push(command.getName());
        }

        let comp, omelette;

        omelette = require("omelette");

        comp = omelette("scm <command>");


        comp.on("command", function () {
            return this.reply(commands);
        });

        comp.init();
    }

    addDescription(): void {
        this.commander.description("A command line tool for anything: the Scripts Cherry Monster can do anything for you!")
    }

    getEngine(): any {
        return this.commander;
    }

    installCommand(commandToInstall: Command) {

        let command = this.commander.command(commandToInstall.getName());
        command.description(commandToInstall.getDescription());

        for (let option of commandToInstall.getOptions()){
            command.option(option.flags, option.description);
        }
        command.arguments(commandToInstall.getCommandArguments());
        command.action(commandToInstall.getAction());
        commandToInstall.finalize();
        this.commands.push(commandToInstall);
    }

    parse() {
        this.commander.parse(process.argv);
    }
}