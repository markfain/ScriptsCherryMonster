import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class ResizeImagesInCurrentDirectory extends Script{
    execute(){

        let dir:File = Files.file("/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/BoatAngles/images/Spine/SeaMonsterHand");
        for (let image of dir.listFiles()){
            if (image.getExtension() == "png"){
                let command:string = "convert "+image.getNameWithExtension()+" -resize 20% "+image.getNameWithExtension();
                this.execSync(command, dir);
            }
        }
        


    }
}

let ResizeImagesInCurrentDirectoryInstance = new ResizeImagesInCurrentDirectory("ResizeImagesInCurrentDirectory", "resize images in current directory");
ResizeImagesInCurrentDirectoryInstance.execute();

//@name:ResizeImagesInCurrentDirectory
//@description:resize images in current directory