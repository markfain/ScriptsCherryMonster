import {Command} from "../core/Command";
import {Logger} from "../core/Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Prompt} from "../core/Prompt";
import {Templates} from "../core/Templates";
//import template = Handlebars.template;
declare var require: any;
declare var process: any;

export class CreateScmCommand extends Command {

    constructor() {
        super("generateScm", "Generates a new SCM command", 3);
    }

    handleAnswer(answer: any): void {
        answer.nameInLowercase = answer.name.toLowerCase();
        this.createTemplate(answer);
    }

    createTemplate(data: any): void {
        let commandDestinationFile = Files.file("$SCM_COMMANDS$", data.name + ".ts");
        console.log(commandDestinationFile);
        let templateFile: File = Files.file("$SCM$", "src/commands/templates/ScmCommand.template");
        console.log(templateFile);
        Templates.writeTemplateInstanceToFile(templateFile, commandDestinationFile, data);
    }

    /**
     * TODO: add also options and arguments for generation
     * TODO: add the ability to generate command in a subfolder
     *
     * @param options
     */

    doExecute(options: any): void {
        let userPrompt = new Prompt();

        userPrompt
            .input("name", "Command Name:")
            .input("description", "Command Description:")
            .confirm("isToolbox", "Is this a toolbox command?")
            .input("subfolder", "Subfolder to add this task (leave blank if wanted under general commands)")
            .input("tasks", "Number of tasks:")
            .bind(this, this.handleAnswer);
    }

}