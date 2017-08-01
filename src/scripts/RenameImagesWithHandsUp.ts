import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
export class RenameImagesWithHandsUp extends Script{
    execute(){
        Files.setPlaceholder("$PLAY$", "/Playground");
        let folder:File = Files.file("$PLAY$", "LaughWithHandsUp/images");
        for (let file of folder.listFiles()){
            let fileName = file.getName();
            if (fileName.startsWith("hands_up")){
                Files.copyFile(file, Files.file(folder, fileName.replace("hands_up_", "")+".png"));
                Files.delete(file);
            }
        }
    }
}

let RenameImagesWithHandsUpInstance = new RenameImagesWithHandsUp("RenameImagesWithHandsUp", "rename images starting with a prefix");
RenameImagesWithHandsUpInstance.execute();

//@name:RenameImagesWithHandsUp
//@description:rename images starting with a prefix