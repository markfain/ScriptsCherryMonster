import {Command} from "../core/Command";
import {Logger} from "../core/Logger";
declare var require:any;
declare var process:any;
export class TestCommand extends Command {

    constructor() {
        super("TestCommand", "description1", 100);
    }

    doSetArguments() {
    };

    doAddOptions() {
        this.addOption("-e, --exec_mode <mode>", "Which exec mode to use");
    }

    doAddDescription() {
        this.addDescription("does something 1");
    }

    doAddAction() {
        this.addAction(
            (options:any):void => {
                let numberOfTens:number = 0;
                while (numberOfTens < 100) {
                    let rand:number = Math.floor(Math.random() * 10000000) + 1;
                    if (rand == 10) {
                        numberOfTens = numberOfTens + 1;
                        this.finishTask();
                    }
                }
                /*
                 curl http://localhost:8333/executeCommand --data "command=UpdateDependenciesCommand&episodeFolder=/Users/markfainstein/Dev/SlateRoot/Content/MathEpisodes/episodes/$1&useExplodedApiVersion=true&configFileName=WebPacking.json&outputFilename=gen/\$Dependencies.js"

                 */
                Logger.log("Finished this task");


            }
        )
    }
}