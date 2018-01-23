import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class FixParametersFile extends Script{
    execute(){
        let parametersFile:File = Files.file("$EPISODES$", "Worksheet/parameters/Parameters.js");
        let json = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(parametersFile));
        let possibleThemes = ["LighthouseTheme", "SpaceTheme", "UnderwaterTheme"];
        for (let parameter in json){
            if (parameter!="type"){
                let parameterContent = json[parameter];
                if (parameterContent && !parameterContent["theme"]){
                    let randomThemeIndex = Math.floor(Math.random()*possibleThemes.length);
                    parameterContent["theme"] = possibleThemes[randomThemeIndex];
                }
            }
        }
        let textToWrite:string = JavascriptUtils.wrapJsonInDescriptorDeclaration("Parameters", JSON.stringify(json, null, 4));
        TextFiles.write(parametersFile, textToWrite);
    }
}

let FixParametersFileInstance = new FixParametersFile("FixParametersFile", "fix paramters file");
FixParametersFileInstance.execute();

//@name:FixParametersFile
//@description:fix paramters file