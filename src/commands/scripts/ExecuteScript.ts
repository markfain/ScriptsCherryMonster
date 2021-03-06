import {Logger} from "../../core/Logger";
import {Files} from "../../utils/Files";
import {File} from "../../utils/File";
import {TextFiles} from "../../utils/TextFiles";
import {Prompt} from "../../core/Prompt";
import {Command} from "../../core/Command";
import {Spinner} from "../../core/Spinner";
declare var require: any;
declare var process: any;

export class ExecuteScript extends Command {

    constructor() {
        super("executescript", "Execute a script and hope it will work", 1);
        this.commandArguments = [
            "scriptName"
        ];
        this.options = [
            {
                flags: "-d, --desc",
                description: "show script description "
            }
        ];
    }

    doExecute(options: any): void {
        let scriptName = this.getArgument("scriptName", options);

        if (this.getOption("desc", options)){
            let scriptFileTs:File = Files.file("$SCM_SCRIPTS$", scriptName+".ts");
            TextFiles.read(scriptFileTs);
            
            return;
        }

        if (scriptName){
            let scriptFileTs:File = Files.file("$SCM_SCRIPTS$", scriptName+".ts");
            let distFolder = Files.file("$SCM_DISTRIBUTION$");
            let scriptFileJs:File = Files.file(distFolder, "scripts/"+scriptName+".js");
            let scmProject = Files.file("$SCM$");
            //TODO: how to compile only a specific file? is that possible?
            //Logger.log(this.execSyncRedirectOutput("node -v", scmProject, true));
            //Logger.log(this.execSyncRedirectOutput("tsc -v", scmProject, true));
            this.execSyncRedirectOutput("npm run compile", scmProject);
            
            this.execSyncRedirectOutput("node "+scriptFileJs.getAbsolutePath(), scmProject);
        }


    }

}