import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
import {TextFiles} from "../utils/TextFiles";
import {JavascriptUtils} from "../utils/JavascriptUtils";
import * as path from 'path';
export class InfrastructureTypes extends Script{

    private excludeList = [
        "JSClass","primodial", "yepnope", "AnimationScript"
    ];
    private infra;

    createTypings(pathToFile:string){
        this.execSyncRedirectOutput("dtsmake -s "+pathToFile);
    }

    findImportFile(src:File, className:string, list:string[]){
        for (let file of src.listFiles()){
            if (file.isDirectory()){
                this.findImportFile(file, className, list);
            }
            else {
                if (file.getExtension().indexOf("js")>=0 && file.getName().indexOf("Temp")<0){
                    if (file.getName() == className){
                        list.push(file.getAbsolutePath());
                    }
                    else {
                        let content:string[] = TextFiles.readLines(file);
                        let extendLineIndex = this.getExtendLine(file);
                        if (extendLineIndex!=-1){
                            let classes = this.getGroups(content[extendLineIndex]);
                            if (classes && classes.child == className){
                                list.push(file.getAbsolutePath());
                            }
                        }
                    }
                }
            }
        }

    }

    getDeclarationLine(file:File, className:string){
        let jsFile = TextFiles.readLines(file);
        for (let i=0; i<jsFile.length; i++){
            let line = jsFile[i];
            if (line.indexOf("var "+className+" {")>=0){
                return i;
            }
        }
        return -1;
    }

    getExtendLine(file:File){
        let jsFile = TextFiles.readLines(file);
        for (let i=0; i<jsFile.length; i++){
            let line = jsFile[i];
            if (line.indexOf("extend")>=0){
                return i;
            }
        }
        return -1;

    }

    getGroups(str){
        const regex = /var\s+(\w+)\s+=\s+(\w+)/g;
        let m;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                //console.log(`Found match, group ${groupIndex}: ${match}`);
            });
            return {
                "child": m[1],
                "parent": m[2]
            }
        }
    }

    processTypingsFile(typingsFile:File, child:string, parent:string, importFilePath:string){
        let lines = TextFiles.readLines(typingsFile);
        let newLines = [];
        for (let i=0; i<lines.length; i++){
            let line = lines[i];
            if (line.indexOf("interface "+child)>=0){
                newLines[i] = "declare class "+child+" extends "+ parent+ "{";
            }
            else {
                newLines[i] = line;
            }
        }

        if (importFilePath){
            let relativePath = path.relative(typingsFile.getAbsolutePath(), importFilePath);
            let importLine = "import {"+parent+"}"+ " from "+"\""+relativePath.substring(1).replace(".js", "")+"\"";
            Logger.log("import line: "+importLine);
            //do not actually import for now
            //newLines[0] = importLine;
        }
        TextFiles.write(typingsFile, newLines.join("\n"), true);

    }

    convertToJavascriptClass(file, line){
        let jsContentByLines = TextFiles.readLines(file);
        let extendsText = jsContentByLines[line];
        let classes = this.getGroups(extendsText);
        let jsContent = JavascriptUtils.extractJsonFromClassDeclaration(TextFiles.read(file), false);
        if (!jsContent){
            Logger.log("could not extract "+file);
            return;
        }
        if (!classes){
            Logger.log("could not get classes of " + file);
            return;
        }
        jsContent = jsContent.replace(new RegExp(":function", 'g'), "");
        jsContent = jsContent.replace(new RegExp(": function", 'g'), "");
        let newFile = "class "+classes.child+" extends "+classes.parent+" "+jsContent+" ";
        let tempFile = Files.file(file.getParentFile(), file.getName()+"Temp.js");
        TextFiles.write(tempFile, newFile);
        return classes;
    }

    resolveDestinationFile(file){
        let relativePath = path.relative(this.infra.getAbsolutePath(), file.getAbsolutePath().replace("Temp.d.ts", ""));

        if (relativePath.indexOf("d.ts")<0){
            relativePath = relativePath+".d.ts";
        }

        let destinationFile = Files.file(this.infra, "../typings/"+relativePath);
        if (!destinationFile.getParentFile().exists()){
            Logger.log(relativePath+" "+destinationFile.getParentFile().getAbsolutePath());
        }
        Logger.log("Resolved destination path "+destinationFile.getAbsolutePath());
        return destinationFile;
    }

    createTypingsForDirectory(directory:File){
        if (!directory.isDirectory()){
            return;
        }
        for (let file of directory.listFiles()){
            if (file.getName().indexOf("Temp")>=0){
                continue;
            }
            if (file.isDirectory()){
                this.createTypingsForDirectory(file);
            }
            else {
                if (file.getExtension().indexOf("js")>=0){
                    if (this.excludeList.indexOf(file.getName())>=0){
                        continue;
                    }
                    let extendsLine = this.getExtendLine(file);
                    if (extendsLine!=-1){
                        Logger.highlight(file.getName());
                        let classes = this.convertToJavascriptClass(file, extendsLine);
                        if (!classes){
                            continue;
                        }

                        /*if (this.excludeList.indexOf(classes.parent)>=0){
                            let tempFile = Files.file(file.getParentFile(), file.getName()+"Temp.js");
                            Files.delete(tempFile);
                            continue;
                        }*/

                        let tempFile = Files.file(file.getParentFile(), file.getName()+"Temp.js");
                        let targetTypingsFile = Files.file(file.getParentFile(), file.getName()+".d.ts")
                        let tempTypingsFile = Files.file(file.getParentFile(), file.getName()+"Temp.d.ts")
                        this.createTypings(tempFile.getAbsolutePath());

                        Files.copyFile(tempTypingsFile, targetTypingsFile);

                        Files.delete(tempTypingsFile);
                        Files.delete(tempFile);

                        let importFilePaths:string[] = [];
                        if (classes.parent){
                            this.findImportFile(this.infra, classes.parent, importFilePaths);
                            if (classes.parent === "SlateObject"){
                                Logger.highlight("!!!! "+importFilePaths[0]);
                            }
                        }
                        let importFilePath:string;
                        if (importFilePaths && importFilePaths.length==1){
                            importFilePath = importFilePaths[0];
                        }

                        this.processTypingsFile(targetTypingsFile,  classes.child, classes.parent, importFilePath);

                        continue;
                    }
                    this.createTypings(file.getAbsolutePath());
                    //let typings  =Files.file(file.getAbsolutePath().replace(".js", ".d.ts"));
                    //let typingsFile = Files.file(file.getParentFile(), file.getName()+".d.ts");

                }
            }
        }
    }

    execute(){
        let infra:File = Files.file("$INFRASTRUCTURE$", "/src");
        this.infra = infra;
        this.createTypingsForDirectory(infra);
    }
}

let InfrastructureTypesInstance = new InfrastructureTypes("InfrastructureTypes", "create typings files for the insfrastructure");
InfrastructureTypesInstance.execute();

//@name:InfrastructureTypes
//@description:create typings files for the insfrastructure