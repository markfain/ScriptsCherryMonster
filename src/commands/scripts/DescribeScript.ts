import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Templates} from "../../core/Templates";
import {Scripts} from "../../core/Scripts";
import {Logger} from "../../core/Logger";
import {TextUtils} from "../../utils/TextUtils";
declare var require: any;
declare var process: any;

export class DescribeScript extends Command {

    constructor() {
        super("describescript", "Prints the description of a script", 1);
        this.commandArguments = [
            "scriptName"
        ];
    }

    private extractDescription(line):string{
        let regex = /@description:(.+)/g;
        let groups = TextUtils.getRegexGroups(line, regex);
        return groups[0];
    }
    doExecute(options: any): void {
        let scriptName: string = this.getArgument("scriptName", options);
        let scriptSourceFile = Files.file("$SCM_SCRIPTS$", scriptName + ".ts");
        let lines = TextFiles.readLines(scriptSourceFile);

        for (let line of lines){
            if (line.trim().indexOf("@description:")>=0){
                Logger.log(this.extractDescription(line));
                break;
            }
        }
    }

}