import {Command} from "../../core/Command";
import * as Progress from 'progress';
import * as soundPlayer from 'play-sound';
import {Logger} from "../../core/Logger";
import {ProcessUtils} from "../../utils/ProcessUtils";

export class Pomodoro extends Command {

    constructor() {
        super("tomato", "Starts a tomato timer", 2);
        this.options = [
            {
                flags: "-t, --time <time>",
                description: "time in minutes"
            }
        ]
    }

    format(timeUnit:number):string{
        if (timeUnit<10){
            return "0"+timeUnit;
        }
        return ""+timeUnit;

    }

    doExecute(options: any): void {
        let spinner = require('ora')("Pomodoro") //TODO: should get name as param?;
        //TODO: type of spinner to be random...?
        spinner.start();
        let minutes:number = this.getOption("time", options);
        if (!minutes){
            minutes = 5;
        }
        let seconds: number = 0;
        let interval = setInterval(() => {

            if (seconds == 0 && minutes == 0){
                spinner.text = "00:00";
            }
            else if (seconds == 0 ){
                seconds = 59;
                minutes = minutes - 1;

            }
            else {
                seconds = seconds -1;
            }

            spinner.text = this.format(minutes) +":"+ this.format(seconds);


        }, 1000);
        setTimeout(() => {
            //Files.file("")
            spinner.stop();
            clearInterval(interval);
            //TODO: fix path
            //TODO: playing sound should be done using a lib, not relying on afplay (MAC)
            //TODO: should also be part of a utility, like AudioUtils, or maybe AudioPlayer.
            ProcessUtils.execSync('afplay /Users/markfainstein/Dev/ScriptsCherryMonster/src/commands/other/tomatoFinishTone.mp3');
        }, minutes*60*1000)

    }

}