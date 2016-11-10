declare var require:any;
declare var process:any;

interface IProgressBarOptions{
    width:number;
    total:number;
    clear:boolean;
}

export class ProgressBar {

    private progressBar:any;
    private bar:any;


    constructor(commandName:string, numberOfTasks?:number){
        this.progressBar = require('progress');
        let barOptions:IProgressBarOptions = {
            width: 20,
            total: numberOfTasks || 10,
            clear: true
        };
        this.bar = new this.progressBar("Happily Executing: "+ commandName+ " [:bar] :percent :etas", barOptions);
    }

    finishTask(){
        this.bar.tick();
    }





}