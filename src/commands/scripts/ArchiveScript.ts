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

export class ArchiveScript extends Command {

    constructor() {
        super("archiveScript", "Archives a script", 1);
        this.commandArguments = [
            "scriptName"
        ];
    }
    execute(options: any): void {
        let scriptName: string = this.getArgument("scriptName", options);
        let scriptSourceFile = Files.file("$SCM_SCRIPTS$", scriptName + ".ts");
        let scriptDestinationFile = Files.file("$SCM_SCRIPTS$", "../archive/"+scriptName + ".ts");
        Files.copyFile(scriptSourceFile, scriptDestinationFile);
        Files.delete(scriptSourceFile);
        Scripts.regenerateScriptsList();
        Logger.highlight(scriptName + " has been archived, oh yeah!")
    }

}