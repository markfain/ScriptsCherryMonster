import {Logger} from "../../core/Logger";
import {Command} from "../../core/Command";
export class GitBrowse extends Command {

    constructor() {
        super("gitbrowse", "open a dual window to browse git.\n" +
            "use ctrl+a+backspace to switch panes.\n" +
            "use scm gitdiff changes -c *commit* to browse file changes ", 1);
    }

    doExecute(options) {
        //use CTRL+a+BACKSPACE to move between panes
        this.execSyncRedirectOutput("stmux -- [ \"scm gitlog files\" .. \"bash\" ]  ")
    }
}