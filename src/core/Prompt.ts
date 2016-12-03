declare var require: any;
declare var process: any;

interface IPromptable {
    type: string;
    name: string;
    message: string;
    choices?: string[];
}

export class Prompt {
    private questions: IPromptable[];

    constructor() {
        this.questions = [];
    }

    public input(name: string, message: string) {
        this.questions.push({
            type: "input",
            name: name,
            message: message
        });
        return this;
    }

    public confirm(name: string, message: string) {
        this.questions.push({
            type: "confirm",
            name: name,
            message: message
        });
        return this;
    }

    public list(name: string, message: string, choices: string[]) {
        this.questions.push({
            type: "list",
            name: name,
            message: message,
            choices: choices
        });
        return this;
    }

    public bind(object: any, callback: (answer: any) => void) {
        let inquirer = require("inquirer");
        //TODO: check why Inquirer is not working after import

        inquirer.prompt(this.questions).then(function (answers: any) {
            callback.call(object, answers);
        });
    }
}