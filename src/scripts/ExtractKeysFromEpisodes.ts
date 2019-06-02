import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
export class ExtractKeysFromEpisodes extends Script{
    execute(){

        let episodeName = "WordProblems";
        let variantName = "DecimalsMultiplicationDivisionByDecimalA";
        let keys:string[] = this.extractEpisodeKeys(episodeName, variantName);

        this.writeToTextFile(episodeName, keys);
    }

    private extractKeysFromBundle(bundle:any):string[]{
        let keys:string[] = [];
        let entries = bundle["bundles"][0]["entries"];
        for (let i=0; i<entries.length; i++){
            keys.push(entries[i]["key"]);
        }
        return keys;
    }

    private extractEpisodeKeys(episodeName:string, variantName?:string):string[]{
        let episodeFolder:File = Files.file("$EPISODES$", episodeName);
        if (variantName){
            if (episodeName.indexOf("WordProblems")>=0){

                let bundleFile = Files.file(episodeFolder, "src/common/localization/by_variant/"+variantName+"Bundle.js");
                let commonBundleFile = Files.file(episodeFolder, "src/common/localization/"+episodeName+"Bundle.js");
                let genericBundle = Files.file(episodeFolder, "src/common/localization/"+"GenericWordProblemsCommon"+"Bundle.js");

                let bundleFiles = [bundleFile, commonBundleFile, genericBundle];
                let allKeys:string[] = [];
                for (let bundle of bundleFiles){
                    Logger.log("Extracting "+bundle.getName());
                    if (!bundle.exists()){
                        Logger.error("Bundle does not exist "+bundle.getName());
                    }
                    let bundleContents = TextFiles.read(bundle);
                    let bundleJson = JavascriptUtils.extractJsonFromClassDeclaration(bundleContents, true);
                    let keys:string[] = this.extractKeysFromBundle(bundleJson);
                    for (let key of keys){
                        Logger.log("adding key "+key);
                        allKeys.push(key);
                    }
                }
                Logger.log(""+allKeys.length);
                return allKeys;


            }
            Logger.error("Supports only word problems!");
            return;

        }
        else {
            let bundleFile = Files.file(episodeFolder, episodeName+"Bundle.js");
            if (!bundleFile.exists()){
                Logger.error("Bundle file of "+episodeName+" does not exist");
                return [];
            }
            let bundleContents = TextFiles.read(bundleFile);
            let bundleJson = JavascriptUtils.extractJsonFromClassDeclaration(bundleContents, true);
            let keys = this.extractKeysFromBundle(bundleJson);
            return keys;
        }



    }

    private writeToTextFile(name:string, lines:string[]){
        let textFile:File = Files.file("$PLAY$", "Marketing/"+name+".txt");
        TextFiles.writeLines(textFile, lines);
    }
}

let ExtractKeysFromEpisodesInstance = new ExtractKeysFromEpisodes("ExtractKeysFromEpisodes", "extracts localization keys from episodes to a text file");
ExtractKeysFromEpisodesInstance.execute();

//@name:ExtractKeysFromEpisodes
//@description:extracts localization keys from episodes to a text file