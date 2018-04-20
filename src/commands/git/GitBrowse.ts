import {Logger} from "../../core/Logger";
import {Command} from "../../core/Command";
export class GitBrowse extends Command {

    constructor() {
        super("gitbrowse", "open a dual window to browse git ", 1);
    }

    doExecute(options) {
        this.execSyncRedirectOutput("stmux [ \"scm gitlog files\" .. \"bash\" ]  ")
    }
}