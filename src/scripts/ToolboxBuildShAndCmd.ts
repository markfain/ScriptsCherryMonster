import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class ToolboxBuildShAndCmd extends Script{
    execute(){
        let libs = Files.file("/Users/markfainstein/Dev/Distribution/tools/toolbox/lib");
        for (let lib of libs.listFiles()){
            Logger.log("CLASSPATH=$CLASSPATH:lib/"+lib.getName()+".jar");
        }
    }
}

let ToolboxBuildShAndCmdInstance = new ToolboxBuildShAndCmd("ToolboxBuildShAndCmd", "build sh and cmd files for toolbox");
ToolboxBuildShAndCmdInstance.execute();

//@name:ToolboxBuildShAndCmd
//@description:build sh and cmd files for toolbox