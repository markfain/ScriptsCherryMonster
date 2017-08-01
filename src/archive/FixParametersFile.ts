import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class FixParametersFile extends Script{
    execute(){
        Files.setPlaceholder("$PLAY$", "/Playground");
        let parametersFile:File = Files.file("$PLAY$", "Parameters.js");
        let json = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(parametersFile));
        for (let parameter in json){
            if (parameter!="type"){
                let parameterContent = json[parameter];
                if (parameterContent && parameterContent["sections"]){
                    let sections = parameterContent["sections"];
                    if (!sections[0]["repeats"]){
                        sections[0]["repeats"] = "10";
                    }
                }
            }
            let textToWrite:string = JavascriptUtils.wrapJsonInDescriptorDeclaration("Parameters", JSON.stringify(json, null, 4));
            TextFiles.write(Files.file("$PLAY$", "Parameters1.js"), textToWrite);
        }
    }
}

let FixParametersFileInstance = new FixParametersFile("FixParametersFile", "fix paramters file");
FixParametersFileInstance.execute();

//@name:FixParametersFile
//@description:fix paramters file