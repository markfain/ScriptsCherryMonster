import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
export class WorksheetsAddDerivedValue extends Script{
    execute(){
        let derivedValueAddition = TextFiles.readJson(Files.file("$PLAY$", "Worksheet/derivedValueAddition.json"));
        let derivedValueSubtraction = TextFiles.readJson(Files.file("$PLAY$", "Worksheet/derivedValueSubtraction.json"));
        let generatedProblemsFile:File = Files.file("$PLAY$", "Worksheet/Worksheet_AdditionSubtractionTensUpTo100_GeneratedProblems.js");
        let generatedProblemsContainer = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(generatedProblemsFile));
        let generatedProblems = generatedProblemsContainer["problems"];
        for (let generatedProblem in generatedProblems){
            if (generatedProblems[generatedProblem]["validate"] == "c-d==e"){
                generatedProblems[generatedProblem].inputs = JavascriptUtils.deepClone(derivedValueSubtraction);
            }
            else {
                generatedProblems[generatedProblem].inputs = JavascriptUtils.deepClone(derivedValueAddition);
            }

        }
        generatedProblemsContainer.problems = JavascriptUtils.deepClone(generatedProblems);
        let strippedName:string = generatedProblemsFile.getName().replace("Worksheet_", "").replace("_GeneratedProblems", "");
        let generatedProblemsToWrite = JavascriptUtils.wrapJsonInDescriptorDeclaration(generatedProblemsFile.getName(), JSON.stringify(generatedProblemsContainer));
        TextFiles.write(generatedProblemsFile, generatedProblemsToWrite);
    }
}

let WorksheetsAddDerivedValueInstance = new WorksheetsAddDerivedValue("WorksheetsAddDerivedValue", "add derived value to existing old worksheets");
WorksheetsAddDerivedValueInstance.execute();

//@name:WorksheetsAddDerivedValue
//@description:add derived value to existing old worksheets