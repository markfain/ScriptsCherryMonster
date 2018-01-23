import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
export class GitAdd extends Command {

    constructor() {
        super("gitadd", "add file to git staging", 2);
        this.commandArguments = [
            "filePath"
        ];
    }

    execute(options) {
        let filePath = this.getArgument("filePath", options);
        Logger.log(this.execSyncRedirectOutput("git add "+filePath, null, true));
    }
}