import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
export class GitStatus extends Script {

    createRepositoryMap() {
        Files.setPlaceholder("$SLATE_ROOT$", "SlateRoot");
        return {
            "Content": Files.file("$SLATE_ROOT$", "Content"),
            "Infrastructure": Files.file("$SLATE_ROOT$", "Infrastructure"),
            "SlateTools": Files.file("$SLATE_ROOT$", "../SlateTools"),
            "SlateMathV2": Files.file("$SLATE_ROOT$", "../SlateMathV2"),
            "Editors": Files.file("$SLATE_ROOT$", "Editors"),
            "Samples": Files.file("$SLATE_ROOT$", "Samples")
        }
    }

    execute() {

        let repositoryMap = this.createRepositoryMap();
        for (let repositoryName in repositoryMap) {
            let repositoryFile = repositoryMap[repositoryName];
            Logger.log(
                repositoryName + ": " +
                this.execSyncRedirectOutput("git branch | grep \\*", repositoryFile, true) +
                " "
                //this.execSyncRedirectOutput("git status -sb", repositoryFile, true)
            );
        }

    }
}

let GitStatusInstance = new GitStatus("GitStatus", "gets the git status of all relevant dev. branches");
GitStatusInstance.execute();

//@name:GitStatus
//@description:gets the git status of all relevant dev. branches