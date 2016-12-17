import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
export class Scripts {

    private static getScriptFiles():File[]{
        let scriptsFolder:File = Files.file("$SCM_SCRIPTS$");
        let scripts:File[] = scriptsFolder.listFiles();
        return scripts;
    }

    private static getScripts():string[]{
        let scriptsFolder:File = Files.file("$SCM_SCRIPTS$");
        let scripts:File[] = scriptsFolder.listFiles();
        let scriptNames:string[] = [];
        for (let scriptFile of scripts){
            scriptNames.push(scriptFile.getName());
        }
        return scriptNames;
    }

    public static regenerateScriptsList(): void {
        let scriptsListFile:File = Files.file("$SCM_SCRIPTS$", "scripts.json");

        let scripts:File[] = this.getScriptFiles();
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