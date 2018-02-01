import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
export class GitReset extends Command {

    constructor() {
        super("gitreset", "reset a file (unstage)", 2);
        this.commandArguments = [
            "filePath"
        ];
    }

    execute(options) {
        let filePath = this.getArgument("filePath", options);
        Logger.log(this.execSyncRedirectOutput("git reset HEAD "+filePath, null, true));
    }
}
