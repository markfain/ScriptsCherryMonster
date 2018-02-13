import {Command} from "../../core/Command";
import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
declare var require: any;
declare var process: any;

export class GenerateTypescriptClass extends Command {

    constructor() {
        super("generateTs", "Generates a typescript class", 3);
        this.commandArguments = [
            "class"
        ];
    }

    handleAnswer(answer: any): void {
    }

    doExecute(options: any): void {
        let handlebars: any = require('handlebars');
        let userPrompt = new Prompt();

        userPrompt
            .input("className", "Class Name:")
            .input("description", "Class Description")
            .bind(this, this.handleAnswer);
    }

}