import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import {TextFiles} from "../utils/TextFiles";
export class CheckMetadataInWorksheets extends Script{
    execute(){
        let dbFile = Files.file("$PLAY$", "db.json");
        let db = TextFiles.readJson(dbFile);
        let worksheets = db["worksheets-editor"]["worksheets"];
        let worksheetsMetadata = db["worksheets-editor"]["worksheetsMetadata"];

        for (let worksheet in worksheets){
            if (!worksheetsMetadata[worksheet]){
                Logger.log(worksheet);
            }
        }
    }
}

let CheckMetadataInWorksheetsInstance = new CheckMetadataInWorksheets("CheckMetadataInWorksheets", "validate metadata exists for worksheets");
CheckMetadataInWorksheetsInstance.execute();

//@name:CheckMetadataInWorksheets
//@description:validate metadata exists for worksheets