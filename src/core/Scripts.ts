import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
export class Scripts {


    public static regenerateScriptsList(): void {
        let scriptsFolder:File = Files.file("$SCM_SCRIPTS$");
        let scriptsListFile:File = Files.file("$SCM_SCRIPTS$", "scripts.json");

        let scripts:File[] = scriptsFolder.listFiles();
        let scriptsList: string[] = [];
        for (let script of scripts){
            if (script.getExtension()!="ts"){
                continue;
            }
            let scriptName = script.getName();
            scriptsList.push(scriptName);
        }
        TextFiles.write(scriptsListFile, {scripts:scriptsList}, true);
    }
}