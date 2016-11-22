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
        super("GenerateTypescriptClass", "Generates a typescript class", 3);
    }

    doAddArguments(): void {
        this.addArgument("class");
    }

    doAddOptions(): void {
        //this.addOption("-p, --path <path>", "The path of generation");
        //this.addOption("--project <proj>", "The project: toolsserver, scm...");
        //this.addOption("-c, --class <className>", "The class name");
    }

    handleAnswer(answer: any): void {
        console.log("asdasd");
    }

    doAddAction(options: any): void {
        let handlebars: any = require('handlebars');
        let userPrompt = new Prompt();

        userPrompt
            .input("className", "Class Name:")
            .input("description", "Class Description")
            .bind(this, this.handleAnswer);

        //Prompt.input("description", "Please enter description:", this.handleAnswer);


        /*if (options.project.toLowerCase() == "toolsserver") {

         }*/
        //console.log(classArguemnt);
        //console.log(options.class);
        //console.log(process.cwd());

        /* let data = this.getDataObject(options.class);
         let classDestinationFolder = Files.file("$TOOLS_SERVER$", options.path)
         this.finishTask();
         Logger.log("Finished this task");

         let templateFile:File = Files.file("$SCM$", "src/commands/templates/TypescriptClass.template");
         let fileAsString:string = Files.readFile(templateFile).toString();
         let template:any = handlebars.compile(fileAsString);
         let templateClass:any = template(data);

         let targetFile = Files.file(classDestinationFolder, options.class+".txt");

         this.finishTask();

         TextFiles.write(targetFile, templateClass, true);
         this.finishTask();*/
    }

}