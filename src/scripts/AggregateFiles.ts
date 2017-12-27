import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class AggregateFiles extends Script{
    execute(){
        let folder:File = Files.file("$PLAY$", "locales");
        let targetFile = Files.file("$PLAY$", "plural_forms.js");
        let targetFileText = "";
        for (let file of folder.listFiles()){
            let separationLine = "//############################################################################ "+file.getName()+" ############################################################################"+"\n";
            let text = TextFiles.read(file);
            text = text.replace("var numerous = require('../lib/numerous.js');", "");
            targetFileText = targetFileText+separationLine+text+"\n";
        }

        TextFiles.write(targetFile, targetFileText);
        Logger.log("aggregated all files in folder "+folder.getName()+" to file "+targetFile.getName());


    }
}

let AggregateFilesInstance = new AggregateFiles("AggregateFiles", "aggregates different files into one file");
AggregateFilesInstance.execute();

//@name:AggregateFiles
//@description:aggregates different files into one file