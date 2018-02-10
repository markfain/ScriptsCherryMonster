import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
import {TextUtils} from "../../utils/TextUtils";
import * as Table from 'cli-table';
import {Logger} from "../../core/Logger";
export class GitStatus extends Command {

    constructor() {
        super("gitstatus", "get the git status of some important repositories", 2);
    }

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
        let statusMap = {};
        let repositoryMap = this.createRepositoryMap();
        for (let repositoryName in repositoryMap) {
            let repositoryFile = repositoryMap[repositoryName];
            this.execSyncRedirectOutput("git fetch", repositoryFile, true);
            let gitStatus = this.execSyncRedirectOutput("git status", repositoryFile, true);

            let repositoryStatusRegex = /Your branch is (.+)(with|\,).+/g;
            let branchRegex = /On branch (.+)/g;
            let status = TextUtils.getRegexGroups(gitStatus, repositoryStatusRegex)[0];
            let branch = TextUtils.getRegexGroups(gitStatus, branchRegex)[0];
            statusMap[repositoryName] = {"status":status, "branch":branch};
        }

        var table = new Table({
            head: ['Repository', "Branch", "Status"]
        });

        for (let repositoryName in statusMap){

            table.push([repositoryName, statusMap[repositoryName]["branch"], statusMap[repositoryName]["status"]]);
        }
        console.log(table.toString());
    }
}