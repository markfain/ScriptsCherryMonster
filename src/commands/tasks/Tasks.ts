import {Files} from "../../utils/Files";
import {Task, TaskStatus} from "./Task";
import {TextFiles} from "../../utils/TextFiles";
import {Logger} from "../../core/Logger";
import * as Table from 'cli-table';
import {RemoteTasks} from "./RemoteTasks";
import * as Chalk from 'chalk';
import {ProgressBar} from "../../core/ProgressBar";
export class Tasks{

    public static DEFAULT_GROUP = "Slate";
    public static DEFAULT_PRIORITY = -1;
    public static DEFAULT_PRIORITY_DISPLAY = "-";

    public static taskFromJson(json:any){
        return new Task(
            json["name"],
            json["description"],
            json["notes"],
            json["id"],
            json["status"],
            json["group"],
            json["priority"],
            json["added"]
        );
    }

    public static async addTask(task:Task){
        await RemoteTasks.pushTask(task);
        Logger.log("Added task "+task.getName()+" with id "+task.getId());
    }

    public static async removeTaskById(id:string){
        await RemoteTasks.removeById(id);
        Logger.log("Removed task "+id);
    }

    public static async startTaskById(id:string, progress:ProgressBar){
        progress.finishTask();
        let task = await RemoteTasks.fetchById(id);
        progress.finishTask();
        task.start();
        progress.finishTask();
        await RemoteTasks.pushTask(task);
        progress.finishTask();
        Logger.log("Started task "+id);
    }

    public static async completeTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        task.complete();
        await RemoteTasks.pushTask(task);
        Logger.log("Completed task "+id);
    }

    public static async pauseTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        task.pause();
        await RemoteTasks.pushTask(task);
        Logger.log("Paused task "+id);
    }

    public static async listTasks(listCompletedTasks, group){
        let tasks = await RemoteTasks.fetchAll();

        var table = new Table({
            head: ['ID', 'Name', 'Status', 'Priority']
        });

        if (listCompletedTasks){
            tasks = this.filterTasks(tasks, (task)=>{return task.isCompleted()})
        }
        else {
            tasks = this.filterTasks(tasks, (task)=>{return !task.isCompleted()});
        }

        if (!group){
            tasks = this.filterTasks(tasks, (task)=>{return task.getGroup().toLowerCase() == this.DEFAULT_GROUP.toLowerCase()})
        }
        else {
            tasks = this.filterTasks(tasks, (task)=>{return task.getGroup().toLowerCase() == group.toLowerCase()})
        }


        for (let task of tasks){
            if (listCompletedTasks && task.isCompleted()){
                table.push([task.getId(), task.getName(), task.getColoredStatus(), task.getPriority()]);
            }
            else{
                table.push([task.getId(), task.getName(), task.getColoredStatus(), task.getPriority()]);
            }

        }
        console.log(table.toString());

    }

    public static async listTaskNotes(id){
        let task = await RemoteTasks.fetchById(id);
        var table = new Table({
            head: ['#', "Note (Task '"+task.getName()+"')"]
        });
        let notes = task.getNotes();
        for (let i=0; i<notes.length; i++){
            table.push([i+1, notes[i]]);
        }
        console.log(table.toString());
    }

    public static async addNoteToTaskById(id:string, note:string){
        let task = await RemoteTasks.fetchById(id);
        task.addNote(note);
        await RemoteTasks.pushTask(task);
        Logger.log("Added note to task "+id);
    }

    public static async getTaskIds(){
        let ids = [];
        let tasks = await RemoteTasks.fetchAll();
        for (let task of tasks){
            ids.push(task.getId());
        }
    }

    private static filterTasks(tasks:Task[], filter:(task)=>boolean){
        let filtered = [];
        for (let task of tasks){
            if (filter(task)){
                filtered.push(task);
            }
        }
        return filtered;
    }

    public static async setPriority(id:string, priority:number){
        let task = await RemoteTasks.fetchById(id);
        task.setPriority(priority);
        await RemoteTasks.pushTask(task);
        Logger.log("Priority "+priority+" is set for task "+id);

    }
}