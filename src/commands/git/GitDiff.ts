import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
export class GitDiff extends Command {

    constructor() {
        super("gitdiff", "see commit changes (specify commit hash)", 1);
        //TODO: maybe split to two commands, gitDiffFile and gitDiff?
        //TODO: it is convinent that the file is an argument for the auto completion
        // (this is why it is not an option like the commit)
        this.commandArguments = [
            "fileOrChanges"
        ];

        this.options = [
            {
                flags: "-c, --commit <commit>",
                description: "commit to show diff for"
            }
            /*{
                flags: "-f, --file <file>",
                description: "file to show diff for"
            }*/
        ]
    }

    execute(options) {
        let commit = this.getOption("commit", options);
        let file = this.getArgument("fileOrChanges", options);
        if (!commit){
            commit = "HEAD";
        }
        if (file.toLowerCase()!="changes"){
            Logger.log(this.execSyncRedirectOutput("git difftool "+commit+"^ "+file, null, true));
        }
        else {
            Logger.log(this.execSyncRedirectOutput("git diff "+commit+"^ --name-only", null, true));
        }

    }
}