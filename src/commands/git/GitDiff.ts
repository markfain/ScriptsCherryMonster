import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
export class GitDiff extends Command {

    constructor() {
        super("gitdiff", "compare with diff tool", 2);
        this.commandArguments = [
            "filePath"
        ];
    }

    execute(options) {
        let filePath = this.getArgument("filePath", options);
        Logger.log(this.execSyncRedirectOutput("git diff ^HEAD "+filePath, null, true));
    }
}