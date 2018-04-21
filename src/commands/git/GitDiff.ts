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
            if (file){
                filesPrompt.push({title:file, value:file});
            }

        }

        prompt('Choose a file to diff...:', filesPrompt, {cursor: 0})
            .on('submit', (v) => this.diffFile(v, commit));

    }

    extractCommitSection(lines:string[], commitSuffix:string){
        let section = [];
        for (let i=0; i<lines.length; i++){
            let line = lines[i];
            if (line.endsWith(commitSuffix)){

                if (i==lines.length){
                    return;
                }
                section[0] = line;
                let j = i+1;
                let nextCommitLine = lines[j];
                while (!nextCommitLine.startsWith("commit")){
                    section[j-i]=lines[j];
                    j++;
                    nextCommitLine = lines[j]
                }
                break;

            }
        }
        return section
    }

    doExecute(options) {
        let file = this.getArgument("fileOrChanges", options);
        let commitSuffix = this.getOption("commit", options);
        if (!commitSuffix){
            Logger.log(this.execSyncRedirectOutput("git difftool HEAD:"+file+" "+file, null, true));
            return;
        }
        else {
            let log = this.execSyncRedirectOutput("git log --name-only", null, true);
            let lines:string[] = log.toString().split("\n");
            let section = this.extractCommitSection(lines, commitSuffix);
            let files = [];

            let k=0;
            if (section.length<2){
                Logger.warn("No commit that ends with "+commitSuffix+" found!");
                return;
            }
            let i=section.length-2;

            while (section[i]!="" && i>0){
                files[k] =  section[i];
                k++;
                i--;
            }
            let actualCommit = section[0].replace("commit ", "");
            this.prompt(files, actualCommit);



        }

    }

    private diffFile(file:string, commit:string) {
        Logger.log("git difftool "+commit+"^! ");
        Logger.log(this.execSyncRedirectOutput("git difftool "+commit+"^! "+file, null, true));
    }
}