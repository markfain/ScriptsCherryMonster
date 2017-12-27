import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class WorksheetsCleanParametersFile extends Script{
    execute(){
        let worksheetEpisode = Files.file("$EPISODES$", "Worksheet");
        let parameters = Files.file(worksheetEpisode, "parameters/Parameters.js");
        let parametersContent = TextFiles.read(parameters);
        let parametersStripped = JavascriptUtils.extractJsonFromClassDeclaration(parametersContent);
        /*for (let variant in parametersStripped){
            if (variant!="type"){
                let generatedFile = Files.file(worksheetEpisode, "src/common/problems/Worksheet_"+variant+"_GeneratedProblems.js");
                if (!generatedFile.exists()){
                    Logger.error("going to delete"+generatedFile.getName());
                }
                else {
                    //Logger.log("this one exists "+generatedFile.getName());
                }
            }
        }*/


        /*let dbFile = Files.file("$PLAY$", "db.json");
        let db = TextFiles.readJson(dbFile);
        let worksheets = db["worksheets-editor"]["worksheets"];*/


        let problems = Files.file(worksheetEpisode, "src/common/problems");
        for (let generatedProblems of problems.listFiles()){
            let strippedName = generatedProblems.getName().replace("Worksheet_", "").replace("_GeneratedProblems","");
            if (!parametersStripped[strippedName]){
                Logger.log(strippedName+" does not exist in parameters file");
                parametersStripped[strippedName] = {
                    "type": "sections",
                    "sections": [
                        {
                            "type": "sampleSection",
                            "repeats": "10",
                            "problems": [
                                {
                                    "type": "",
                                    "problemType": "STANDARD_EXERCISE"
                                }
                            ]
                        }
                    ]
                };
            }
            else {

                //if (worksheets[strippedName]){
                    //Logger.log("found worksheet!")
                //}
                //Logger.highlight(strippedName+ " exists");
            }
            let content = JavascriptUtils.wrapJsonInDescriptorDeclaration("Parameters", JSON.stringify(parametersStripped, null, 4));
            TextFiles.write(parameters, content);
        }




        /*
            prompt the user for something:
            userPrompt
                .input("name", "Command Name:")
                .input("description", "Command Description:")
                .input("tasks", "Number of tasks:")
                .bind(this, this.handleAnswer);
        */

        /*for (let parameter in parametersStripped){
            if (!worksheets[parameter]){
                if (parameter == "type"){
                    continue;
                }
                delete parametersStripped[parameter];
                let generatedProblems = Files.file(problems, "Worksheet_"+parameter+"_GeneratedProblems.js");
                if (generatedProblems.exists()){
                    Files.delete(generatedProblems);
                    Logger.log("deleted "+generatedProblems.getName());
                }


                Logger.log("should delete "+parameter+" from parameters");
            }
        }*/



    }
}

let WorksheetsCleanParametersFileInstance = new WorksheetsCleanParametersFile("WorksheetsCleanParametersFile", "clean parameters file form deleted worksheets");
WorksheetsCleanParametersFileInstance.execute();

//@name:WorksheetsCleanParametersFile
//@description:clean parameters file form deleted worksheets