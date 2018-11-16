import {File} from "./File"
declare var require:any;
//TODO: generalize and encapsulate with TextFiles class
export class JavascriptUtils{

    private static extractTextBetweenMatchingParenthesis(text:string, startIndex:number, openSymbol:string, closeSymbol:string){
        let index:number = startIndex;
        let n:number = text.length;
        while (index<n && text.charAt(index)!=openSymbol) {
            index++;
        }
        if (index >= n) {
            return;
        }
        let count:number = 0;
        let extracted:string = "";

        while (index<n) {
            let c:string = text.charAt(index);
            extracted = extracted+c;
            if (c == openSymbol) {
                count++;
            }
            else if (c == closeSymbol) {
                count--;
            }
            if (count == 0) {
                break;
            }
            index++;
        }
        if (count > 0) {
            return null;
        }
        return extracted;
    }

    public static wrapJsonInVarDeclaration(variableName:string, json:string):string {
        return "var "+variableName+" = "+json+";";
    }

    public static wrapJsonInVarDeclarationWithClassManagerRegistration(variableName:string, json:string):string {
        return "var "+variableName+" = "+json+";\n\n"+"classManager.register(\""+variableName+"\", "+variableName+");";
    }

    public static wrapJsonInDescriptorDeclaration(name:string, content:string):string {
        let jsDeclaration:string = "classManager.registerDescriptor(\""+name+"\", "+content+");";
        return jsDeclaration;
    }

    public static extractJsonFromClassDeclaration(content:string, shouldParse?:boolean):any{
        let extractedContent:string = this.extractTextBetweenMatchingParenthesis(content, 0, "{", "}");
        if (shouldParse){
            return JSON.parse(extractedContent);
        }
        else {
            return extractedContent;
        }
    }

    public static getMediaTypeMemTypeByExt(fileName: string) {
        let ext:string = fileName.substr(fileName.lastIndexOf('.') + 1);
        var type = ext == 'jpeg' ? 'jpg' : ext;
        return 'image/' + type;
    }

    public static deepClone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    public static createSimpleArray(size){
        let array = [];
        for (let i=0; i<size; i++){
            array.push(i);
        }
        return array;
    }

    /**
     * move to TextUtils
     *
     * @param calelCaseString
     * @returns {string}
     */
    public static camelCaseToUnderscoreSeparated(calelCaseString:string){
        return(calelCaseString.replace(/\.?([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, ""));
    }

    public static underscoreSeparatedToCamelCase(underscoreString:string){
        let camelCased = underscoreString.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        camelCased = camelCased[0].toUpperCase + camelCased.substring(1);
        return camelCased;
    }


    /**
     * move to TextUtils
     * @param search
     * @param replacement
     * @returns {string|void}
     */
    public static replaceAll(str, search, replacement){
        return str.replace(new RegExp(search, 'g'), replacement);
    }


}