import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
export class ImportTranslationsToWorksheetBundle extends Script{
    execute(){
        let instructions: File = Files.file("$PLAY$", "instructions/corrected.json");
        let instructionsJson = TextFiles.readJson(instructions);

        let worksheetBundle = Files.file("$PLAY$", "instructions/WorksheetBundle.js");
        let worksheetBundleTarget = Files.file("$PLAY$", "instructions/WorksheetBundleTarget.js");
        let worksheetBundleJson = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(worksheetBundle), true);
        let entries = worksheetBundleJson["bundles"][0]["entries"];
        for (let instruction in instructionsJson){
            for (let entry of entries){
                if (entry["key"] == "worksheet_"+ instruction){
                    entry["text"]=instructionsJson[instruction]["text"];
                    Logger.log("corrected key "+instruction + " with text "+instructionsJson[instruction]["text"]);
                }
            }
        }
        let contentToWrite = JavascriptUtils.wrapJsonInVarDeclarationWithClassManagerRegistration("WorksheetBundle", JSON.stringify(worksheetBundleJson));
        TextFiles.write(worksheetBundleTarget,contentToWrite);


    }
}

let ImportTranslationsToWorksheetBundleInstance = new ImportTranslationsToWorksheetBundle("ImportTranslationsToWorksheetBundle", "import translations to worksheet bundle (corrected instructions)");
ImportTranslationsToWorksheetBundleInstance.execute();

//@name:ImportTranslationsToWorksheetBundle
//@description:import translations to worksheet bundle (corrected instructions)