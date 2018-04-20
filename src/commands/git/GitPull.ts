import {Logger} from "../../core/Logger";
import {Command} from "../../core/Command";
export class GitPull extends Command {

    constructor() {
        super("gitpull", "pull from git, correctly", 1);
    }

    doExecute(options) {
        Logger.log(this.execSyncRedirectOutput("git pull --ff-only", null, true));
    }
}