import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
export class GitCheckout extends Command {

    constructor() {
        super("gitcheckout", "checkout a file (reset to commit)", 2);
        this.commandArguments = [
            "filePath"
        ];
    }

    doExecute(options) {
        let filePath = this.getArgument("filePath", options);
        Logger.log(this.execSyncRedirectOutput("git checkout HEAD -- "+filePath, null, true));
    }
}