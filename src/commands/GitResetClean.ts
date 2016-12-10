import {Command} from "../core/Command";
import {Logger} from "../core/Logger";
import {Prompt} from "../core/Prompt";
declare var require: any;
declare var process: any;

export class GitResetClean extends Command {

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

        let userPrompt = new Prompt();

        userPrompt
            .confirm("shouldCleanAndReset", "About to git reset and clean for " + dir)
            .bind(this, this.handleAnswer);
    }

}