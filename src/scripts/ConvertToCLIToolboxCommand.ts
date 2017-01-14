import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {TextFiles} from "../utils/TextFiles";
export class ConvertToCLIToolboxCommand extends Script{

    public extractTextBetweenTwoSymbols(text:string, startIndex:number, openSymbol:string, closeSymbol:string){
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



    execute(){
        Files.setPlaceholder("$PLAY$", "/Playground");
        let commandPrefix = "./toolbox.sh -headless -command ";
        let commandFile:File = Files.file("$PLAY$", "convertToolboxCommands/command.txt");
        let command:string = TextFiles.read(commandFile);
        let commandName:string;
        if (command.indexOf("&")<0){
            //case there are no parameters
            commandName = this.extractTextBetweenTwoSymbols(command, command.indexOf("="), "=", "&");
            Logger.log("Command name is "+commandName);
            Logger.log("command should be: "+commandPrefix+commandName);
        }
        else {
            let splittedByAnd = command.split("&");

            let firstChunk:string = splittedByAnd[0];
            commandName = firstChunk.substr(firstChunk.indexOf("=")+1);
            Logger.log("coommand name is " +commandName);
            let argumentsStr:string = " ";
            for (let i=1; i<splittedByAnd.length-1; i++){
                let chunk:string = splittedByAnd[i];
                let parameterName:string = chunk.substr(0, chunk.indexOf("="));
                let parameter:string = chunk.substr(chunk.indexOf("=")+1);
                Logger.log(parameterName);
                Logger.log(parameter);
                argumentsStr = argumentsStr + parameterName + " "+parameter+" ";
            }
            Logger.log("command should be:");
            Logger.log("cd /Users/jenkins/1Dev/toolbox");
            Logger.log(commandPrefix+commandName+argumentsStr);

        }

    }

    private getCommandName(){

    }

    private findCommandName() {


    }
}

let ConvertToCLIToolboxCommandInstance = new ConvertToCLIToolboxCommand("ConvertToCLIToolboxCommand", "convert from web api toolbox to cli toolbox");
ConvertToCLIToolboxCommandInstance.execute();

//@name:ConvertToCLIToolboxCommand
//@description:convert from web api toolbox to cli toolbox