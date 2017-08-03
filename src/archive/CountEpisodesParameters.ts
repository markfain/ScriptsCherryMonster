import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class CountEpisodesParameters extends Script{
    execute(){
        Files.setPlaceholder("$EPISODES$", "SlateRoot/Content/MathEpisodes/episodes/");
        let episodesWithNoParameters:string[] = [];
        let episodesWithOneParameter:string[] = [];
        let episodesFolder:File = Files.file("$EPISODES$");
        for (let episode of episodesFolder.listFiles()){
            if (!episode.isDirectory()){
                continue;
            }
            let parametersFile = Files.file(episode, "Parameters.js");
            if (!parametersFile.exists()){
                parametersFile = Files.file(episode, "parameters/Parameters.js");
            }
            if (!parametersFile.exists()) {
                parametersFile = Files.file(episode, "src/parameters/Parameters.js");
            }
            if (!parametersFile.exists()) {
                parametersFile = Files.file(episode, "src/common/parameters/Parameters.js");
            }
            if (!parametersFile.exists()){
                episodesWithNoParameters.push(episode.getName());
                continue;
            }
            Logger.log(episode.getName());

            let parametersFileContent:string[] = TextFiles.readLines(parametersFile);
            let parametersFileContentAfterCleaning:string[] = [];
            for (let line of parametersFileContent){
                line = line.trim();
                let startIndex = line.indexOf("//");
                if (startIndex>=0){
                    line = line.substring(0, startIndex);
                }
                if (line.indexOf("/*")>=0){
                    let startOfComment = line.indexOf("/*");
                    let endingOfComment = line.indexOf("*\\", startOfComment+2);
                    line = line.substring(0, startOfComment)+line.substring(endingOfComment, line.length);
                }


                parametersFileContentAfterCleaning.push(line);
            }

            let entity = JavascriptUtils.extractJsonFromClassDeclaration(parametersFileContentAfterCleaning.join("\n"));
            let variantNumber:number = 0;
            for (let variant in entity){
                variantNumber++;
            }
            if (variantNumber == 1){
                episodesWithOneParameter.push(episode.getName());
            }




        }
        Logger.log(JSON.stringify(episodesWithNoParameters));


        /*
            prompt the user for something:
            userPrompt
                .input("name", "Command Name:")
                .input("description", "Command Description:")
                .input("tasks", "Number of tasks:")
                .bind(this, this.handleAnswer);
        */


    }
}

let CountEpisodesParametersInstance = new CountEpisodesParameters("CountEpisodesParameters", "count which episodes have a certain number of parameters");
CountEpisodesParametersInstance.execute();

//@name:CountEpisodesParameters
//@description:count which episodes have a certain number of parameters