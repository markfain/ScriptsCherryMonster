import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
export class WorksheetsAddPrefixToInstructions extends Script{
    execute(){
        Files.setPlaceholder("$EPISODES$", "SlateRoot/Content/MathEpisodes/episodes/");
        Files.setPlaceholder("$PLAY$", "/Playground");
        let worksheetEpisodeFolder:File = Files.file("$EPISODES$", "Worksheet");
        let generatedProblemsFolder:File = Files.file(worksheetEpisodeFolder, "src/common/problems");
        for (let file of generatedProblemsFolder.listFiles()){
            let lines:string[] = TextFiles.readLines(file);
            for (let i=0; i<lines.length; i++){
                let line = lines[i];
                line = line.trim();
                let indexOfInstruction = line.indexOf("instructionKey");
                if (indexOfInstruction<0){
                    continue;
                }
                else{
                    const regex = /"\w+":\s+"(\w+)",/g;
                    let m;

                    while ((m = regex.exec(line)) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }

                        // The result can be accessed through the `m`-variable.
                        let match = m[1];
                        let newKey = "Worksheet_"+match;
                        Logger.log("replaced "+match);
                        line = line.replace(match, newKey);
                        lines[i] = "\t\t\t"+line;
                    }
                }
                TextFiles.write(file, lines.join("\n"), true);

            }

        }
    }
}

let WorksheetsAddPrefixToInstructionsInstance = new WorksheetsAddPrefixToInstructions("WorksheetsAddPrefixToInstructions", "");
WorksheetsAddPrefixToInstructionsInstance.execute();

//@name:WorksheetsAddPrefixToInstructions
//@description: