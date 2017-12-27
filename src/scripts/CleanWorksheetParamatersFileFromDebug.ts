import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class CleanWorksheetParamatersFileFromDebug extends Script{
    execute(){
        let parametersFile = Files.file("$EPISODES$", "Worksheet/parameters/Parameters.js");
        let content = TextFiles.read(parametersFile);
        let json = JavascriptUtils.extractJsonFromClassDeclaration(content);
        for (let parameter in json){
            if (parameter.indexOf("_Debug")>0){
                delete json[parameter];
            }
        }
        let targetParametersFile = Files.file("$EPISODES$", "Worksheet/parameters/ParametersCleaned.js");
        TextFiles.write(targetParametersFile, json);


    }
}

let CleanWorksheetParamatersFileFromDebugInstance = new CleanWorksheetParamatersFileFromDebug("CleanWorksheetParamatersFileFromDebug", "cleans the worksheet parameters file from the ghost debug parameters");
CleanWorksheetParamatersFileFromDebugInstance.execute();

//@name:CleanWorksheetParamatersFileFromDebug
//@description:cleans the worksheet parameters file from the ghost debug parameters