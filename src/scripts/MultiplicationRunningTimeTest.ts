import {Logger} from "../core/Logger";
import {Script} from "../core/Script";
import {Files} from "../utils/Files";
import {File} from "../utils/File";
import {Prompt} from "../core/Prompt";
export class MultiplicationRunningTimeTest extends Script{
    execute(){
        let timeBefore = new Date().getTime();

        for (let i=0; i<5000000; i++){
            let a = Math.floor(Math.random()*1000);
            let b = Math.floor(Math.random()*1000);
            let c = a*b;
        }
        let timeAfter = new Date().getTime();
        Logger.log("execution time:"+ (timeAfter - timeBefore)+" ms");



    }
}

let MultiplicationRunningTimeTestInstance = new MultiplicationRunningTimeTest("MultiplicationRunningTimeTest", "test multiplication running time");
MultiplicationRunningTimeTestInstance.execute();

//@name:MultiplicationRunningTimeTest
//@description:test multiplication running time