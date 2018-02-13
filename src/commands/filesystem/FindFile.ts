import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
declare var require: any;
declare var process: any;

export class FindFile extends Command {

    private NUMBER_OF_TASKS = 20;
    private root: File;

    constructor() {
        super("findfile", "Finds a file under a root folder, searching by filenames. If one file is found will copy the path to clipboard. Anyway will show a list of file paths.", 20);
        this.options = [
            {
                flags: "-r, --root <root>",
                description: "The root to begin search under"
            }
        ];
        this.commandArguments = [
            "fileName"
        ]
    }

    private discoverAllFiles(root: File, find: string, list: string[]): string[] {
        if (!root.isDirectory()) {
            return;
        }

        else {
            if (list == null) {
                list = [];
            }
            for (let file of root.listFiles()) {
                if (file.isDirectory()) {
                    this.discoverAllFiles(file, find, list);
                }
                else {
                    list.push(file.getAbsolutePath());
                }
            }
        }
        return list;
    }

    private getProgressEstimation(root: File): number {
        let progressEstimation = 0;
        for (let file of root.listFiles()) {
            if (file.isDirectory()) {
                progressEstimation++;
            }
        }
        return progressEstimation;
    }

    /**
     * TODO: should use Finder class instead.
     */
    private findFileInFolder(root: File, find: string, list: string[], progressStep: number, ignoreCase = false): string[] {
        if (!root.isDirectory()) {
            return;
        }
        else {
            if (list == null) {
                list = [];
            }

            for (let file of root.listFiles()) {
                if (file.isDirectory()) {
                    this.findFileInFolder(file, find, list, progressStep);
                    if (root.getAbsolutePath() == this.root.getAbsolutePath()) {
                        this.finishTasks(progressStep);
                    }
                }
                else {
                    let fileNameWithExtension = file.getName() + "." + file.getExtension();
                    if (ignoreCase) {
                        fileNameWithExtension = fileNameWithExtension.toLowerCase();
                    }
                    if (fileNameWithExtension == find) {
                        list.push(file.getAbsolutePath());
                    }
                }
            }
        }
    }

    private handleAnswer(answer: any) {
        this.execSync("echo " + answer.file + " | pbcopy");
    }

    private getNumberOfTasks(root: File): number {
        let count = 0;
        if (!root.isDirectory()) {
            return;
        }

        else {
            for (let file of root.listFiles()) {
                if (file.isDirectory()) {
                    count = count + 1;
                    count = count + this.getNumberOfTasks(file);
                }
                else {
                    count = count + 1;
                }
            }
        }
        return count;
    }

    doExecute(options: any[]): void {
        let rootPath: string = this.getOption("root", options);

        if (rootPath) {
            Logger.log("Specifying root through -r is currently not supported, wait for next version");
            Logger.highlight("Feel free to search under current directory without the -r option");
        }
        else {
            let root: File = Files.file(this.getCurrentDir());
            this.root = root;
            let fileToFind: string = this.getArgument("fileName", options);
            let ignoreCase: string = this.getOption("ignoreCase", options);
            let ignoreFlag: boolean = (ignoreCase === "true");
            if (ignoreFlag) {
                fileToFind = fileToFind.toLowerCase();
            }
            //TODO: should count number of files
            let list: string[] = [];
            let progressEstimation: number = this.getProgressEstimation(root);
            let progressStep: number;
            if (this.NUMBER_OF_TASKS / progressEstimation < 1) {
                progressStep = this.NUMBER_OF_TASKS / progressEstimation;
            }
            else {
                progressStep = Math.round(this.NUMBER_OF_TASKS / progressEstimation);
            }
            let progressLeft: number = this.NUMBER_OF_TASKS - progressEstimation * progressStep;

            this.findFileInFolder(root, fileToFind, list, progressStep, ignoreFlag);
            this.finishTasks(progressLeft);
            if (list.length == 0) {
                Logger.highlight("No files found of name " + fileToFind);
                return;
            }

            if (list.length < 5 && list.length > 0) {
                let prompt: Prompt = new Prompt();
                prompt.list("file", "Choose a file to copy to clipboard", list).bind(this, this.handleAnswer);
            }
            else {
                //Print the results
                for (let item of list) {
                    Logger.log(item);
                }
            }
        }
    }

}