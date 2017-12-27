import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class SomeTest extends Script{

    valueWithDefaul(value, defaultValue) {
        if (typeof value !== 'undefined') {
            return value;
        }
        return defaultValue;
    }

    execute(){
        let a = null;
        if (!a){
            a = {};
        }
        Logger.log(a);

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

let SomeTestInstance = new SomeTest("SomeTest", "some testing");
SomeTestInstance.execute();

//@name:SomeTest
//@description:some testing