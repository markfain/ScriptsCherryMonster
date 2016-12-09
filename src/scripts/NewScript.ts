import {Logger} from "../core/Logger";
export class NewScript{
    execute(){
        Logger.log("hello there, this is a new script running");
        Logger.error("this is an error");
        Logger.highlight("now added also highlight");
    }
}

let newScript = new NewScript();
newScript.execute();
