import {Command} from "./Command";
import * as Commander from 'commander';
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
declare var require: any;
declare var process: any;
export class CLProgram {

    private commander: any;
    private commands:Command[] = [];
    private scripts:Command[] = [];

    constructor() {
        this.commander = Commander;
        this.addDescription();

    }

    getScripts(): string[]{
        let scriptsList:File = Files.file("$SCM_SCRIPTS$", "scripts.json");
        let scripts:any = JSON.parse(TextFiles.read(scriptsList));
        return scripts.scripts;
    }

    addAutoCompleteCommands(): void {

        let scripts:string[] = this.getScripts();

        let commands:string[] = [];
        for (let command of this.commands){
            commands.push(command.getName());
        }

        let comp, comp1, omelette;

        omelette = require("omelette");

        comp = omelette("scm <command> <script>");

        comp.on("command", function () {
            return this.reply(commands);
        });

        comp.on("script", function () {
            return this.reply(scripts);
        });

        comp.init();
    }

    addDescription(): void {
        this.commander.description("A command line tool for anything: the Scripts Cherry Monster can do anything for you!")
    }

    getEngine(): any {
        return this.commander;
    }

    private install(instabllable: Command){

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