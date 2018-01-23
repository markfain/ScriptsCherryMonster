import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class ExtractSpineFolderFromPop extends Script{
    execute(){
        let exportFolder = Files.file("$PLAY$", "extractedSpine");
        let spineFolder = Files.file("$ENVELOPES$", "apps/PlanetsOfPixels/episodes/PlanetsOfPixels/spine");
        let imagesFolder = Files.file("$ENVELOPES$", "apps/PlanetsOfPixels/libs/pop/res/images/Main/Spine/Villain");
        for (let folder of spineFolder.listFiles( (f:File)=>(f.getName()).indexOf("Villain")>=0) ){
            //Logger.log(folder.getName());
            let exportAnimationFolder = Files.file(exportFolder, folder.getName());
            Files.copyFolder(folder, exportAnimationFolder);
            let jsonFile = Files.file(folder, folder.getName()+".json");
            if (!jsonFile.exists()){
                let jsFile = Files.file(exportAnimationFolder, folder.getName()+".js");
                let jsonContent:string = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(jsFile));
                TextFiles.write(jsonFile, jsonContent);
            }
            let animationImagesFolder = Files.file(imagesFolder, folder.getName());
            let targetAnimationImagesFolder = Files.file(exportAnimationFolder, "images");
            Files.copyFolder(animationImagesFolder, targetAnimationImagesFolder);
        }





    }
}

let ExtractSpineFolderFromPopInstance = new ExtractSpineFolderFromPop("ExtractSpineFolderFromPop", "extracts a spine (for dev style) folder from Planets Of Pixels app");
ExtractSpineFolderFromPopInstance.execute();

//@name:ExtractSpineFolderFromPop
//@description:extracts a spine (for dev style) folder from Planets Of Pixels app