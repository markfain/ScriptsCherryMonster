import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Templates} from "../../core/Templates";
import {Scripts} from "../../core/Scripts";
import {Logger} from "../../core/Logger";
declare var require: any;
declare var process: any;

export class CreateScript extends Command {

    constructor() {
        super("createScript", "Creates a script (as fast as possible)", 1);
    }

    handleAnswer(answer: any): void {
        answer.nameInLowercase = answer.name.toLowerCase();
        let scriptDestinationFile = Files.file("$SCM_SCRIPTS$", answer.name + ".ts");
        if (scriptDestinationFile.exists()){
            Logger.error("Script by the name "+answer.name+" already exists. " +
                "Please pick a different name");
            return;
        }
        this.createTemplate(answer);
        Scripts.regenerateScriptsList();
        this.execSync("idea "+scriptDestinationFile.getAbsolutePath());
    }

    createTemplate(data: any): void {
        let scriptDestinationFile = Files.file("$SCM_SCRIPTS$", data.name + ".ts");
        let templateFile: File = Files.file("$SCM$", "src/commands/templates/Script.template");
        Templates.writeTemplateInstanceToFile(templateFile, scriptDestinationFile, data);
    }

    execute(options: any): void {
        let userPrompt = new Prompt();

        userPrompt
            .input("name", "Script Name:")
            .input("description", "Script Description:")
            .input("subfolder", "Subfolder to add this task (leave blank if wanted under general commands)")
            .bind(this, this.handleAnswer);

    }

}