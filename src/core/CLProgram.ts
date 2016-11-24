import {Command} from "./Command";
declare var require: any;
declare var process: any;
export class CLProgram {

    private prog: any;
    private commands:Command[] = [];

    constructor() {
        this.prog = require('commander');
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
        this.prog.description("A command line tool for anything: the Scripts Cherry Monster can do anything for you!")
    }

    getEngine(): any {
        return this.prog;
    }

    installCommand(command: Command) {
        command.setProgram(this);
        command.addArguments();
        command.addOptions();
        command.addAction();
        command.addDescription();
        command.finalize();
        this.commands.push(command);
    }

    parse() {
        this.prog.parse(process.argv);
    }
}