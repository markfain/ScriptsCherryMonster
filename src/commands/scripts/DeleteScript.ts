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

export class DeleteScript extends Command {

    private scriptToDelete: File;

    constructor() {
        super("deleteScript", "Deletes a script (as fast as possible)", 1);
        this.commandArguments = [
            "scriptName"
        ];
    }

    handleAnswer(answer): void {
        if (answer.shouldDelete) {
            if (this.scriptToDelete != null) {
                Files.delete(this.scriptToDelete);
                Scripts.regenerateScriptsList();
            }
        }
    }

    execute(options: any): void {
        let scriptName: string = this.getArgument("scriptName", options);
        let scriptsFolder: File = Files.file("$SCM_SCRIPTS$");
        let scriptToDelete = Files.file(scriptsFolder, scriptName + ".ts");
        if (!scriptToDelete.exists()) {
            Logger.error("No such script named " + scriptName);
        }
        this.scriptToDelete = scriptToDelete;
        let userPrompt = new Prompt();

        userPrompt
            .confirm("shouldDelete", "About to delete " + scriptName + "." + " Are you sure?")
            .bind(this, this.handleAnswer);
    }

}