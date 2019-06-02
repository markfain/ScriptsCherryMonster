import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {ProcessUtils} from "../utils/ProcessUtils";
import {JavascriptUtils} from "../utils/JavascriptUtils";
export class WorksheetCapturePrintables extends Script {

    private writeExecutionFile(executionFolder: File, episode: string, variant: string, languages:string[]) {
        let executionFile = Files.file(executionFolder, ".slate.execution.json");
        let exectionJson = TextFiles.readJson(executionFile);
        exectionJson["episode"] = episode;
        exectionJson["variant"] = variant;
        exectionJson["languages"] = languages;
        TextFiles.write(executionFile, exectionJson);
    }

    private extractAllLanguages():string[]{
        let languagesInfo = Files.file(Files.file("$SLATE_ROOT$/Temp/LanguagesInfo.json"));
        let languagesInfoContent = TextFiles.readJson(languagesInfo);
        let languages:string[] = [];
        for (let language of languagesInfoContent){
            languages.push(language["code"]);
        }
        return languages;
    }

    private prepare(){
        let printablesFolder:File = Files.file("$SLATE_ROOT$/Temp/WorksheetPrintables");
        let languages = this.extractAllLanguages();
        for (let language of languages){
            let newFolder = Files.file(printablesFolder, language);
            Logger.log("creating folder "+newFolder);
            Files.mkdir(newFolder);
        }
    }

    private splitToLanguageChunks(array:string[], chunkSize:number):any[]{
        let chunks = [];
        let i,j;
        for (i=0,j=array.length; i<j; i+=chunkSize) {
            let slice = array.slice(i,i+chunkSize);
            chunks.push(slice);
        }
        return chunks;
    }

    execute() {
        //this.prepare();
        let executionFolder = Files.file("$SLATE_ROOT$/Editors/execution");
        let slugs = TextFiles.readLines(Files.file("$SLATE_ROOT$/Temp/WorksheetSlugs.txt"));
        let languages = this.extractAllLanguages();
        let languageChunks = this.splitToLanguageChunks(languages, 7);
        for (let slug of slugs) {
            for (let languageChunk of languageChunks){
                let episodeName = slug.substring(0, slug.indexOf("_"));
                let variantName = slug.substring(slug.indexOf("_")+1);
                Logger.log("Episode: "+episodeName+" Variant: "+variantName);
                this.writeExecutionFile(executionFolder, episodeName, variantName, languageChunk);
                ProcessUtils.execSync("npm run start", executionFolder);
            }

        }
    }
}

let WorksheetCapturePrintablesInstance = new WorksheetCapturePrintables("WorksheetCapturePrintables", "save all captured screenshots from the worksheet episodes using electron");
WorksheetCapturePrintablesInstance.execute();

//@name:WorksheetCapturePrintables
//@description:save all captured screenshots from the worksheet episodes using electron