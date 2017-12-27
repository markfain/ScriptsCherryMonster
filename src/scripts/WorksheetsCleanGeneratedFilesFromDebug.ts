import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class WorksheetsCleanGeneratedFilesFromDebug extends Script{
    execute(){
        let worksheetEpisode = Files.file("$EPISODES$", "Worksheet");
        let problems = Files.file(worksheetEpisode, "src/common/problems");
        for (let generatedProblems of problems.listFiles()){
            if (generatedProblems.getName().indexOf("_Debug")>0){
                Logger.log("deleting "+generatedProblems.getAbsolutePath());
                Files.delete(generatedProblems);
            }
        }


    }
}

let WorksheetsCleanGeneratedFilesFromDebugInstance = new WorksheetsCleanGeneratedFilesFromDebug("WorksheetsCleanGeneratedFilesFromDebug", "cleans generated problem files that have _Debug");
WorksheetsCleanGeneratedFilesFromDebugInstance.execute();

//@name:WorksheetsCleanGeneratedFilesFromDebug
//@description:cleans generated problem files that have _Debug