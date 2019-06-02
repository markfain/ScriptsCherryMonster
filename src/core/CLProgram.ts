import {Command} from "./Command";
//import Commander = require('commander');
import {TextFiles} from "../utils/TextFiles";

import {Files} from "../utils/Files";
import {File} from "../utils/File";

import {GitUtils} from "../utils/GitUtils";
import {TaskUtils} from "../utils/TaskUtils";
import {Tasks} from "../commands/tasks/Tasks";
import {RemoteTasks} from "../commands/tasks/RemoteTasks";
import {Task} from "../commands/tasks/Task";
declare var require: any;
declare var process: any;
export class CLProgram {

    private commander: any;
    private commands:Command[] = [];
    private scripts:Command[] = [];

    constructor() {
        let Commander = require('commander');
        this.commander = Commander;
        this.addDescription();

    }

    getScripts(): string[]{
        let scriptsList:File = Files.file("$SCM_SCRIPTS$", "scripts.json");
        let scripts:any = JSON.parse(TextFiles.read(scriptsList));
        return scripts.scripts;
    }

    public async addAutoCompleteCommands() {

        let scripts:string[] = this.getScripts();

        let commands:string[] = [];
        for (let command of this.commands){
            commands.push(command.getName());
        }

        let comp, omelette;

        omelette = require("omelette");

        comp = omelette("scm <command> <script>");

        comp.on("command", function () {

            return this.reply(commands);
        });

        comp.on("script", async function (userReply) {
            if (userReply.indexOf("git")>=0){
                return this.reply(GitUtils.getOptionalFilesToAdd(true));
            }

            if (userReply.indexOf("task")>=0){
                //let tasks:Task[] = await RemoteTasks.fetchAll(); why this won't work?
                let taskIds:string[] = Tasks.getCachedTasks();

                return this.reply(taskIds);
            }

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

    //a
}