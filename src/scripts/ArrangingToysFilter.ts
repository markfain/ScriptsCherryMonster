import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class ArrangingToysFilter extends Script{
    execute(){
        let generatedProblemsFile = Files.file("$EPISODES$", "ArrangingToys/parameters/ArrangingToys_GeneratedProblems.js");
        let json = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(generatedProblemsFile));
        let problems = json["problems"];
        for (let problem of problems){
            let indexes = problem["indexes"];
        }

    }
}

let ArrangingToysFilterInstance = new ArrangingToysFilter("ArrangingToysFilter", "filter arranging toys questions");
ArrangingToysFilterInstance.execute();

//@name:ArrangingToysFilter
//@description:filter arranging toys questions