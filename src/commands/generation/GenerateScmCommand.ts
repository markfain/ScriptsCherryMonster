import {Command} from "../../core/Command";
import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
declare var require: any;
declare var process: any;

export class GenerateScmCommand extends Command {

    constructor() {
        super("GenerateScmCommand", "Generates a new SCM command", 3);
    }


    handleAnswer(answer): void {
        this.createTemplate(answer);
    }

    //TODO: move this method to a util class
    createTemplate(data: any): void {
        let handlebars: any = require('handlebars');
        let commandDestinationFile = Files.file("$SCM_COMMANDS$", data.name+".ts");
        this.finishTask();
        let templateFile: File = Files.file("$SCM$", "src/commands/templates/ScmCommand.template");
        let fileAsString: string = Files.readFile(templateFile).toString();
        let template: any = handlebars.compile(fileAsString);
        let templateClass: any = template(data);
        this.finishTask();
        TextFiles.write(commandDestinationFile, templateClass, true);
        this.finishTask();
    }

    doAddArguments(): void {
        //this.addArgument("name");
    }

    doAddOptions(): void {
        //this.addOption("-o, --option <option>", "An option");
    }

    /**
     * TODO: add also options and arguments for generation
     * TODO: add the ability to generate command in a subfolder
     *
     * @param options
     */

    doAddAction(options: any): void {
        let userPrompt = new Prompt();

        userPrompt
            .input("name", "Command Name:")
            .input("description", "Command Description:")
            .input("subfolder", "Subfolder to add this task (leave blank if wanted under general commands)")
            .input("tasks", "Number of tasks:")
            .bind(this, this.handleAnswer);
    }

}