import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {TextFiles} from "../utils/TextFiles";
export class GetInstructionsFromTemplates extends Script{
    execute(){
        let templatesWithInstructions = {};
        let database = Files.file("$PLAY$", "db.json");
        let databaseJson:any = TextFiles.readJson(database);
        let templatesMetadata = databaseJson["worksheets-editor"]["templatesMetadata"];
        for (let template in templatesMetadata){
            if (templatesMetadata[template]["instruction"] && templatesMetadata[template]["instruction"]!=""){
                templatesWithInstructions[template] = templatesMetadata[template]["instruction"];
            }
        }
        Logger.log(JSON.stringify(templatesWithInstructions));
        TextFiles.write(Files.file("$PLAY$", "output.json"), templatesWithInstructions);


    }
}

let GetInstructionsFromTemplatesInstance = new GetInstructionsFromTemplates("GetInstructionsFromTemplates", "");
GetInstructionsFromTemplatesInstance.execute();

//@name:GetInstructionsFromTemplates
//@description:get instructions to templates map from worksheets app database