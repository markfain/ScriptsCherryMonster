import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class MyNewScript extends Script{
    execute(){
        Logger.log("hello there, this is a new script running");
        Logger.error("this is an error");
        Logger.highlight("now added also highlight");
        Logger.warn("added also warning");


        /*
            prompt the user for something:
            userPrompt
                .input("name", "Command Name:")
                .input("description", "Command Description:")
                .input("tasks", "Number of tasks:")
                .bind(this, this.handleAnswer);
        */


    }
}

let MyNewScriptInstance = new MyNewScript("MyNewScript", "mydesc");
MyNewScriptInstance.execute();

//@name:MyNewScript
//@description:mydesc