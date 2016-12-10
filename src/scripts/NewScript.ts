import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
export class NewScript extends Script{
    execute(){
        Logger.log("hello there, this is a new script running");
        Logger.error("this is an error");
        Logger.highlight("now added also highlight");
        Logger.warn("added also warning777");
    }
}

let NewScriptInstance = new NewScript("NewScript", "test111");
NewScriptInstance.execute();