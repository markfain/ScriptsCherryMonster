import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {ProcessUtils} from "../utils/ProcessUtils";
export class RestoreGitCommand extends Script{
    execute(){
        let content:string[] = TextFiles.readLines(Files.file("/Users/markfainstein/Desktop/firstmerge.txt"))
        let gitCommand:string = "git checkout ef0a6c94c5b6d8513b56f1f42c49963b309f4bd8 -- ";
        for (let line of content){
            if (content.indexOf("TreasureHuntDrawingLines")>=0){
                continue;
            }
            gitCommand = gitCommand + line + " ";
        }
        let output:string = ProcessUtils.execSyncRedirectOutput(gitCommand, Files.file("$SLATE_ROOT$", "Content"), true);
        Logger.log(output);
    }
}

let RestoreGitCommandInstance = new RestoreGitCommand("RestoreGitCommand", "restore problematic git merge");
RestoreGitCommandInstance.execute();

//@name:RestoreGitCommand
//@description:restore problematic git merge