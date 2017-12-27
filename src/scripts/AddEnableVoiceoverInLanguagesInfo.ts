import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
export class AddEnableVoiceoverInLanguagesInfo extends Script{
    execute(){
        let languagesInfoFile: File = Files.file("$PLAY$", "LanguagesInfo.js");
        let descriptor = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(languagesInfoFile));
        let langauges = descriptor["languages"];




    }
}

let AddEnableVoiceoverInLanguagesInfoInstance = new AddEnableVoiceoverInLanguagesInfo("AddEnableVoiceoverInLanguagesInfo", "add enableVoiceOver flag in LanguagesInfo.js where it is not present");
AddEnableVoiceoverInLanguagesInfoInstance.execute();

//@name:AddEnableVoiceoverInLanguagesInfo
//@description:add enableVoiceOver flag in LanguagesInfo.js where it is not present