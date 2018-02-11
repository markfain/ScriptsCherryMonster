import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class TestScript extends Script{
    execute(){
        Logger.log("hello there, this is a new script running");
        Logger.error("this is an error");
        Logger.highlight("now added also highlight");
        Logger.warn("added also warning");
        
    }
}

let TestScriptInstance = new TestScript("TestScript", "testing");
TestScriptInstance.execute();

//@name:TestScript
//@description:testing