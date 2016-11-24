import {Command} from "../core/Command";
import {Logger} from "../core/Logger";
import {Prompt} from "../core/Prompt";
declare var require: any;
declare var process: any;

export class GitResetClean extends Command {

    constructor() {
        super("GitResetClean", "reset and clean git repo", 2);
    }

    doAddArguments(): void {
        //thiss.addArgument("argName");
    }

    doAddOptions(): void {
        //this.addOption("-0, --option <option>", "A command option");
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

    doAddAction(options: any): void {
        let dir: string = this.execSync("pwd");

        let userPrompt = new Prompt();

        userPrompt
            .confirm("shouldCleanAndReset", "About to git reset and clean for " + dir)
            .bind(this, this.handleAnswer);
    }

}