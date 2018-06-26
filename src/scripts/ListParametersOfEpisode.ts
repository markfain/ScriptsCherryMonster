import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
export class ListParametersOfEpisode extends Script{
    execute(){
        let episode:File = Files.file("$EPISODES$", "Worksheet02");
        let parametersFile:File = Files.file(episode, "parameters/Parameters.js");
        let parameters = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(parametersFile));
        let parametersList = [];
        for (let variant in JSON.parse(parameters)){
            Logger.log(variant)
            parametersList.push(variant);
            //Logger.log(parameter);
        }




    }
}

let ListParametersOfEpisodeInstance = new ListParametersOfEpisode("ListParametersOfEpisode", "lists parameters of an episode, saves in file");
ListParametersOfEpisodeInstance.execute();

//@name:ListParametersOfEpisode
//@description:lists parameters of an episode, saves in file