import * as Progress from 'progress';

interface IProgressBarOptions{
    width:number;
    total:number;
    clear:boolean;
}

export class ProgressBar {

    private progressBar:any;
    private bar:any;
    private tasksAccumulation:number = 0;

    constructor(commandName:string, numberOfTasks?:number){
        this.progressBar = Progress;
        let barOptions:IProgressBarOptions = {
            width: 20,
            total: numberOfTasks+1 || 10,
            clear: true
        };
        this.bar = new this.progressBar(commandName + ":commandPart [:bar] :percent :etas", barOptions);

    }

    finishTask(commandPart?:string){
        //{'commandPart': commandPart}
        this.bar.tick();
    }

    finishTasks(tasks:number){
        if (tasks<1){
            this.tasksAccumulation = this.tasksAccumulation + tasks;
        }

        if (this.tasksAccumulation>1){
            tasks = 1;
            this.tasksAccumulation = this.tasksAccumulation - 1;
        }

        if (this.tasksAccumulation<1 && this.tasksAccumulation>0){
            return;
        }
        if (tasks>=1){
            for (let i =0; i<tasks; i++){
                this.bar.tick();
            }
        }
    }
}