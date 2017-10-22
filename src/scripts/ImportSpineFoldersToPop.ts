import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class ImportSpineFoldersToPop extends Script{
    execute(){
        let importFolder = Files.file("/Users/markfainstein/Desktop/PopMerged");
        let spineFolder = Files.file("$ENVELOPES$", "apps/PlanetsOfPixels/episodes/PlanetsOfPixels/spine");
        let imagesFolder = Files.file("$ENVELOPES$", "apps/PlanetsOfPixels/libs/pop/res/images/Main/Spine/Villain");
        for (let folder of importFolder.listFiles()){
            Logger.log(folder.getName());
            if (!folder.isDirectory()){
                continue;
            }
            Logger.log("importing: "+folder.getName());
            if (folder.getName()=="Common"){
                let targetFolder:File = Files.file(imagesFolder, folder.getName());
                Files.copyFolder(folder, targetFolder);

            }
            else {
                let sourceFolder = Files.file(folder, "images");

                let sourceJs = Files.file(folder, folder.getName()+".js");
                let sourceAtlas = Files.file(folder, folder.getName()+".atlas");
                let sourceJson = Files.file(folder, folder.getName()+".json");

                let targetImagesFolder:File = Files.file(imagesFolder, folder.getName());
                let targetMetadataFolder:File = Files.file(spineFolder, folder.getName());
                let targetSourceJs = Files.file(targetMetadataFolder, folder.getName()+".js");
                let targetSourceAtlas = Files.file(targetMetadataFolder, folder.getName()+".atlas");
                let targetSourceJson = Files.file(targetMetadataFolder, folder.getName()+".json");
                Files.copyFile(sourceJs, targetSourceJs);
                Files.copyFile(sourceJson, targetSourceJson);
                Files.copyFile(sourceAtlas, targetSourceAtlas);



                Files.copyFolder(sourceFolder, targetImagesFolder);
            }
        }

    }
}

let ImportSpineFoldersToPopInstance = new ImportSpineFoldersToPop("ImportSpineFoldersToPop", "");
ImportSpineFoldersToPopInstance.execute();

//@name:ImportSpineFoldersToPop
//@description: