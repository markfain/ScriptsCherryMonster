import {Logger} from "../../core/Logger";
import {Script} from "../../core/Script";
import {Files} from "../../utils/Files";
import {Command} from "../../core/Command";
export class GitDiff extends Command {

    constructor() {
        super("gitdiff", "see commit changes (specify commit hash)", 1);
        //TODO: maybe split to two commands, gitDiffFile and gitDiff?
        //TODO: it is convinent that the file is an argument for the auto completion
        // (this is why it is not an option like the commit)
        this.commandArguments = [
            "fileOrChanges"
        ];

        this.options = [
            {
                flags: "-c, --commit <commit>",
                description: "commit to show diff for"
            }
            /*
                flags: "-f, --file <file>",
                description: "file to show diff for"
            }*/
        ]
    }

    prompt(files:string[], commit:string){
        const prompt = require('select-prompt');
        let filesPrompt = [];

        for (let file of files){
            filesPrompt.push({title:file, value:file});
        }

        prompt('Choose a file to diff?', filesPrompt, {cursor: 3})
            .on('submit', (v) => this.diffFile(v, commit));

    }

    doExecute(options) {
        let file = this.getArgument("fileOrChanges", options);
        let commit = this.getOption("commit", options);
        if (!commit){
            Logger.log(this.execSyncRedirectOutput("git difftool HEAD:"+file+" "+file, null, true));
            return;
        }
        else {
            let log = this.execSyncRedirectOutput("git log --name-only -2", null, true);
            let lines:string[] = log.toString().split("\n");
            let section = [];
            let files = [];
            let actualCommit = "";
            for (let i=0; i<lines.length; i++){
                let line = lines[i];
                if (line.endsWith(commit)){
                    actualCommit = line.replace("commit ", "");
                    if (i==lines.length){
                        return;
                    }
                    let j = i+1;
                    let nextCommitLine = lines[j];
                    while (!nextCommitLine.startsWith("commit")){
                        section[j-(i+1)]=lines[j];
                        j++;
                        nextCommitLine = lines[j]
                    }
                    break;

                }
            }
            let k=0;
            let i=section.length-2;

            while (section[i]!="" && i>0){
                files[k] =  section[i];
                k++;
                i--;
            }

            this.prompt(files, actualCommit);



        }

    }

    private diffFile(file:string, commit:string) {
        Logger.log("git difftool "+commit+"^! ");
        Logger.log(this.execSyncRedirectOutput("git difftool "+commit+"^! "+file, null, true));
    }
}