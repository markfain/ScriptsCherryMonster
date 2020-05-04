import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class Worksheet04ValidateVariants extends Script{
    execute(){
        let episodeIndexes = ["02", "03"];
        let toDelete:File[] = [];
        let worksheet04:File = Files.file("$EPISODES$", "Worksheet04");
        let worksheet04Parameters:File = Files.file(worksheet04, "parameters/problems");
        for (let problem of worksheet04Parameters.listFiles()){
            let name = problem.getName();
            //Logger.highlight("Checking for "+name);
            for (let episodeIndex of episodeIndexes){
                let episodeName:string = "Worksheet"+episodeIndex;
                let worksheetEpisode:File = Files.file("$EPISODES$", episodeName);
                let worksheetEpisodeParameters:File = Files.file(worksheetEpisode, "parameters/problems");
                for (let episodeProblem of worksheetEpisodeParameters.listFiles()){
                    if (name.replace("Worksheet04", "") == episodeProblem.getName().replace(episodeName, "")){
                        Logger.log("Worksheet04 "+name +" exists in "+worksheetEpisode.getName());
                        toDelete.push(problem);
                    }
                }
            }


        }

        for (let problem of toDelete){
            Logger.warn("Deleting "+problem.getName());
            Files.delete(problem);
        }


    }
}

let Worksheet04ValidateVariantsInstance = new Worksheet04ValidateVariants("Worksheet04ValidateVariants", "Worksheet04 validate variants to be included");
Worksheet04ValidateVariantsInstance.execute();

//@name:Worksheet04ValidateVariants
//@description:Worksheet04 validate variants to be included