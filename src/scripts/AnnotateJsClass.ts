import {Logger} from "../core/Logger";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
import {Prompt} from "../core/Prompt";
import {Command} from "../core/Command";
declare var require: any;
declare var process: any;

export class AnnotateJsClass extends Command {

    constructor() {
        super("AnnotateJsClass", "annotate a js infra class for the jsdoc", 3);
    }

    checkIfThisIsReallyAVarWeAreLookingFor(index:number, file:string):number{
        for (let i= index; i<file.length; i++){
            if (file.charAt(i) == "{"){
                return -1; //valid
            }
            if (file.charAt(i) == ";"){
                return i; //invalid
            }
        }
        return 0;

    }

    addAnnotation(file:File, annotation:string, strToFindBefore:string, lastPos?:number, helpStr?:string){
        let fileString:string = TextFiles.read(file);

        if (!lastPos){
            lastPos = fileString.length;
        }

        if (helpStr){
            lastPos = fileString.indexOf(helpStr);
        }

        let varIndex = fileString.substring(0, lastPos).lastIndexOf(strToFindBefore);
        if (varIndex<0){
            return;
        }
        let begin = fileString.substring(0, varIndex);
        let end = fileString.substring(varIndex);
        let newStr = begin+"\n"+annotation+"\n"+end;
        TextFiles.write(file, newStr, true);
    }

    addClassAnnotation(file:File){
        this.addAnnotation(file, "/** @class */", "var");
    }
    addNamespaceAnnotation(file:File, helpStr?:string){
        this.addAnnotation(file, "/** @namespace */", "var", null, helpStr);
    }

    addConstructorAnnotation(file:File){
        this.addAnnotation(file, "/** @constructor */", "init:");
    }

    addExtendsAnnotationAndClass(file:File){
        let fileString:string = TextFiles.read(file);
        const regex = /(\w+).extend/g;
        let match:any = regex.exec(fileString);
        if (!match){
            this.addNamespaceAnnotation(file, "{");
            return;
        }
        let extend:string = match[1];
        let posToTakeLastIndexOf = fileString.indexOf(extend+".extend");
        this.addAnnotation(file, "/**\n@namespace\n@extends "+extend+" \n*/", "var", posToTakeLastIndexOf);
        this.removeExtends(file, extend);

    }

    annotateFiles(root:File){
        for (let file of root.listFiles()){
            if (file.isDirectory()){
                this.annotateFiles(file);
            }
            else {
                //this.addClassAnnotation(file);
                //this.addConstructorAnnotation(file);
                this.addExtendsAnnotationAndClass(file);
            }
        }
    }

    action(options: any): void {
        let infra:File = Files.file("$SLATE_ROOT$/Infrastructure");
        let webSrc:File = Files.file(infra, "/src/common/");
        this.annotateFiles(webSrc);
    }

    private removeExtends(file:File, extend:string) {
        let fileString:string = TextFiles.read(file);
        fileString = fileString.replace(extend+".extend(", "");
        let pos:number = fileString.lastIndexOf("});");
        fileString = fileString.substring(0,pos)+"};"+fileString.substring(pos+3);
        TextFiles.write(file, fileString, true);
    }
}