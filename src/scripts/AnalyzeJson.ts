import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class AnalyzeJson extends Script{
    execute(){

        let charPosition:number = 79094;

        let jsonFile = Files.file("$PLAY$", "myJson.json");
        let text:string = TextFiles.read(jsonFile);
        Logger.log(text.substring(charPosition-200, charPosition-1));
        Logger.highlight(text.substring(charPosition-1, charPosition));
        Logger.log(text.substring(charPosition+1, charPosition+200));


    }
}

let AnalyzeJsonInstance = new AnalyzeJson("AnalyzeJson", "analyzes a json");
AnalyzeJsonInstance.execute();

//@name:AnalyzeJson
//@description:analyzes a json