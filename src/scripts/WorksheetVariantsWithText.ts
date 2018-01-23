import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
export class WorksheetVariantsWithText extends Script{
    execute(){


        let variantsFolder:File = Files.file("$EPISODES$", "Worksheet/parameters/problems");
        let textContainingVariants:string[] = [];
        for (let variant of variantsFolder.listFiles()){
            if (variant.exists() && variant.getExtension().indexOf("js")>=0){
                let json:any = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(variant));
                let problems:any = json["problems"];
                if (problems){
                    for (let problem of problems){
                        if (problem["problemType"] == "TEXT_EXERCISE"){
                            textContainingVariants.push(variant.getName().replace("Worksheet_", "").replace("_GeneratedProblems", ""));
                            break;
                        }
                    }
                }
            }
        }
        for (let variant of textContainingVariants){
            Logger.log(variant);
        }


    }
}

let WorksheetVariantsWithTextInstance = new WorksheetVariantsWithText("WorksheetVariantsWithText", "find worksheet variants containing texts");
WorksheetVariantsWithTextInstance.execute();

//@name:WorksheetVariantsWithText
//@description:find worksheet variants containing texts