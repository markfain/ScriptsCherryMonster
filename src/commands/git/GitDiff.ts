import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
export class GitDiff extends Command {

    constructor() {
        super("gitdiff", "see commit changes (specify commit hash)", 2);
        this.commandArguments = [
            "commit"
        ];

        this.options = [
            {
                flags: "-f, --file <file>",
                description: "file to show diff for"
            }
        ]
    }

    execute(options) {
        let commit = this.getArgument("commit", options);
        let file = this.getOption("file", options);
        if (file){
            Logger.log(this.execSyncRedirectOutput("git diff "+commit+"^! "+file, null, true));
        }
        else {
            Logger.log(this.execSyncRedirectOutput("git diff "+commit+"^! --name-only", null, true));
        }

    }
}