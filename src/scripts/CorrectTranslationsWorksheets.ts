import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class CorrectTranslationsWorksheets extends Script{
    execute(){
        let instructions: File = Files.file("$PLAY$", "instructions/instructions.json");
        let correctedInstructions: File = Files.file("$PLAY$", "instructions/instructions.tsv");
        let instructionsJson = TextFiles.readJson(instructions);
        let correctedInstructionsLines = TextFiles.readLines(correctedInstructions);
        let line = 0;
        for (let correctedInstruction of correctedInstructionsLines){
            if (line == 0){
                line = line+1;
                continue;
            }
            let parts = correctedInstruction.split("\t");
            let key = parts[0];
            let text = parts[1];
            let link = parts[2];
            let correction = parts[4];
            if (instructionsJson[key] && correction){
                Logger.log("found key "+key +" and correcting with "+correction);
                correction = correction.replace("\r", "");

                instructionsJson[key]["text"] = correction;
            }
            line = line+1;
        }
        //all corrected, write
        let targetCorrectedFile = Files.file("$PLAY$", "instructions/corrected.json");
        TextFiles.write(targetCorrectedFile, instructionsJson, true);





    }
}

let CorrectTranslationsWorksheetsInstance = new CorrectTranslationsWorksheets("CorrectTranslationsWorksheets", "correct translations for worksheets");
CorrectTranslationsWorksheetsInstance.execute();

//@name:CorrectTranslationsWorksheets
//@description:correct translations for worksheets