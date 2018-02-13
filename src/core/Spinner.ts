import {Logger} from "./Logger";
export class Spinner {

    private spinner:any;
    private started:boolean;
    private commandName:string;

    constructor(commandName:string){
        var CliSpinner = require('cli-spinner').Spinner;
        var spinner = new CliSpinner('%s '+commandName);
        spinner.setSpinnerString(1);
        this.spinner = spinner;
    }


    start(commandName:string){
        this.commandName = commandName;
        this.spinner.start();
        Logger.log("spinner started");
    }

    startTask(name:string){
        this.spinner.setSpinnerTitle(this.commandName+" : "+name);
    }

    finishTask(){
        //TODO: nothing for now
    }

    stop(){
        this.spinner.stop(true);
    }


}