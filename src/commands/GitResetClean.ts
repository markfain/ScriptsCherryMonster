import {Command} from "../core/Command";
import {Logger} from "../core/Logger";
import {Prompt} from "../core/Prompt";
import {File} from "../utils/File";
import {Files} from "../utils/Files";
declare var require: any;
declare var process: any;

export class GitResetClean extends Command {

    private readonly MAX_LOOKUP:number = 1000;
    private readonly GIT_METADATA_FILENAME = ".git";

    constructor() {
        super("gitresetclean", "reset and clean git repo", 2);
    }

    executeGitCleanAndReset(): void {
        this.execSync("git reset --hard");
        this.finishTask();
        this.execSync("git clean -df");
        this.finishTask();
    }

    handleAnswer(answer: any): void {
        if (answer.shouldCleanAndReset) {
            this.executeGitCleanAndReset();
        }
    }

    execute(options: any): void {
        let dir:string = this.getCurrentDir();

        let gitParentPath:string = this.getGitParent(Files.file(dir));

        if (gitParentPath.length == 0){
            Logger.error("The dir "+dir+" is not a git directory.");
            return;
        }

        let userPrompt = new Prompt();

        userPrompt
            .confirm("shouldCleanAndReset", "About to git reset and clean for " + gitParentPath)
            .bind(this, this.handleAnswer);
    }

    private getGitParent(currentDir:File):string {
        let gitFile:File = Files.file(currentDir, this.GIT_METADATA_FILENAME);
        let lookupCounter:number = 0;
        let workingDir = currentDir;

        while (!gitFile.exists() && lookupCounter<this.MAX_LOOKUP){
            workingDir = workingDir.getParentFile();
            if (workingDir == null || !workingDir.exists()){
                return "";
            }
            gitFile = Files.file(workingDir, this.GIT_METADATA_FILENAME);

            lookupCounter++;
        }

        if (lookupCounter == this.MAX_LOOKUP){
            return "";
        }

        return workingDir.getAbsolutePath();
    }

}