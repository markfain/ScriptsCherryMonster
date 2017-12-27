import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
export class InspectSpineAtlasesForPop extends Script{

    findInLines(lines:string[], line:string, index:number){
       for (let i=2; i<10; i++){
            let lookFor = line.substring(index-i, index+1)
           if (lines.indexOf(lookFor)>=0){
               return true;
           }
        }
        return false;
    }

    execute(){
        let spineFolder:File = Files.file("$PLAY$", "spine");
        for (let folder of spineFolder.listFiles()) {
            if (!folder.isDirectory()) {
                continue;
            }
            let replaced = false;
            let atlasFile = Files.file(folder, folder.getName()+".atlas");
            Logger.highlight("========================= "+folder.getName()+" =============================");
            let lines = TextFiles.readLines(atlasFile);
            for (let i=0; i<lines.length; i++){
                let line = lines[i];
                if (!line.startsWith(" ") && !line.startsWith("size") && !line.endsWith(".png")){
                    let numbers = line.match(/\d+/);
                    if (!numbers){
                        continue;
                    }
                    if (numbers.length>1){
                        Logger.log("line: "+line+" is problematic");
                    }
                    if (numbers.length>0){
                        let number = numbers[0];
                        if (line.endsWith(number)){
                            continue;
                        }
                        else {
                            Logger.log("replacing line: "+line);
                            if (!this.findInLines(lines, line, line.indexOf(number))){
                                Logger.warn("cannot replace this line "+line);
                                continue;
                            }
                            let newLine = line.replace(number, "");
                            replaced = true;
                            //replace in lines array
                            lines[i] = newLine;
                            Logger.log("new line "+newLine);
                        }
                    }
                }
            }
            if (replaced){
                TextFiles.write(atlasFile, lines.join("\n"));
            }



        }

        }

}

let InspectSpineAtlasesForPopInstance = new InspectSpineAtlasesForPop("InspectSpineAtlasesForPop", "inspect spine atlases for pop missing images");
InspectSpineAtlasesForPopInstance.execute();

//@name:InspectSpineAtlasesForPop
//@description:inspect spine atlases for pop missing images