import {Logger} from "../core/Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Prompt} from "../core/Prompt";
import {Command} from "../core/Command";
declare var require: any;
declare var process: any;

export class DeleteFiles extends Command {

    constructor() {
        super("deletefiles", "delete files in some pattern ", 5);
        this.options = [
            {
                flags: "-s, --startsWith <startsWith>",
                description: "starts with soemthing"
            }
        ]
    }

    private getFilesToDelete(dir:string, startsWith:string):string[]{

        let filesToDeletePaths:string[] = [];
        let directory:File = Files.file(dir);
        for (let file of directory.listFiles()){
            if (file.getName().startsWith(startsWith)){
                filesToDeletePaths.push(file.getAbsolutePath());
            }
        }
        return filesToDeletePaths;
    }

    private deleteFiles(){

    }

    action(options: any): void {
        let startsWith = this.getOption("startsWith", options);
        let dir = this.getCurrentDir();

        Logger.log(dir + "starts with "+startsWith);
        Logger.log("about to delete the following files:");
        let files:string[] = this.getFilesToDelete(dir, startsWith);
        for (let filePath of files){
            Logger.log(filePath);
        }

        let userPrompt = new Prompt();
        userPrompt
            .confirm("shouldDelete", "About to delete the following files: ")
            .bind(this, this.deleteFiles);

        /*
            here is the actual action
            prompt the user for something:
            userPrompt
                .input("name", "Command Name:")
                .input("description", "Command Description:")
                .input("tasks", "Number of tasks:")
                .bind(this, this.handleAnswer);

        */
    }

}