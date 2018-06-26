import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class ImportImagesForGraphicWorksheets extends Script{
    execute(){
        let imagesSource:File = Files.file("$PLAY$", "GraphicWorksheets/images");
        let imagesDestination = Files.file("$EPISODES$", "/WorksheetGraphicShapesAndBodies/images/Main/GraphicWorksheets/Shapes3DNetsCylindersAndCones");

        for (let image of imagesSource.listFiles()){
            if (image.getExtension().indexOf("png")>=0){
                Files.copyFile(image, Files.file(imagesDestination, image.getNameWithExtension()))
            }
        }


    }
}

let ImportImagesForGraphicWorksheetsInstance = new ImportImagesForGraphicWorksheets("ImportImagesForGraphicWorksheets", "imports only pngs for graphic worksheets");
ImportImagesForGraphicWorksheetsInstance.execute();

//@name:ImportImagesForGraphicWorksheets
//@description:imports only pngs for graphic worksheets