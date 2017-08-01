import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Command} from "../../core/Command";
export class ReleasePort extends Command {

    constructor() {
        super("releaseport", "get the git status of some important repositories", 2);
        this.commandArguments = [
            "port"
        ];
    }

    processLines(output: string, partSeq: number) {
        let pIds = [];
        let splittedOutput: string[] = output.split("\n");
        for (let i = 1; i < splittedOutput.length; i++) {
            let line = splittedOutput[i];
            let lineParts = splittedOutput[i].split(" +");
            return lineParts[partSeq];
        }
    }

    execute(options:any) {
        let port: string = this.getArgument("port", options) || "8333";
        let output: string = this.execSyncRedirectOutput("sudo lsof -i :"+port, null, true);
        Logger.log(this.processLines(output.toString(), 1));
    }
}