import * as Progress from 'progress';

interface IProgressBarOptions{
    width:number;
    total:number;
    clear:boolean;
}

export class ProgressBar {

    private progressBar:any;
    private bar:any;
    private tasksAccumilation:number = 0;

    constructor(commandName:string, numberOfTasks?:number){
        this.progressBar = Progress;
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

    finishTasks(tasks:number){
        if (tasks<1){
            this.tasksAccumilation = this.tasksAccumilation + tasks;
        }

        if (this.tasksAccumilation>1){
            tasks = 1;
            this.tasksAccumilation = this.tasksAccumilation - 1;
        }

        if (this.tasksAccumilation<1 && this.tasksAccumilation>0){
            return;
        }
        if (tasks>=1){
            for (let i =0; i<tasks; i++){
                this.bar.tick();
            }
        }
    }
}