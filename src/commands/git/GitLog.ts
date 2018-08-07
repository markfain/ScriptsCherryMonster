import {Command} from "../../core/Command";
export class GitLog extends Command {

    constructor() {
        super("gitlog", "show smart log history", 2);
        this.options = [
            {
                flags: "-a, --author <author>",
                description: "commit author"
            },
            {
                flags: "-b, --branch <branch>",
                description: "branch"
            }
        ]
    }

    doExecute(options) {
        let author = this.getOption("author", options);
        let authorParam = "";
        if (author){
            authorParam = "--author="+author;
        }
        let branch = this.getOption("branch", options) || "";

        this.execSyncRedirectOutput("git log --all "+branch+" "+authorParam+" --name-status --stat --graph --pretty=format:'commit: %C(bold red)%h%Creset %C(red)<%H>%Creset %C(bold magenta)%d %Creset%ndate: %C(bold yellow)%cd %Creset%C(yellow)%cr%Creset%nauthor: %C(bold blue)%an%Creset %C(blue)<%ae>%Creset%n%C(cyan)%s%n%Creset'", null, false);
    }
}