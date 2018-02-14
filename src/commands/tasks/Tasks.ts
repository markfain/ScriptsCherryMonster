import {Files} from "../../utils/Files";
import {Task, TaskStatus} from "./Task";
import {TextFiles} from "../../utils/TextFiles";
import {Logger} from "../../core/Logger";
import * as Table from 'cli-table';
import {RemoteTasks} from "./RemoteTasks";
import * as Chalk from 'chalk';
import {ProgressBar} from "../../core/ProgressBar";
import {AsanaClient} from "./AsanaClient";
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
            json["added"],
            json["asanaId"]
        );
    }

    public static async addTask(task:Task, isAsana){
        if (isAsana){
            let asanaId = await AsanaClient.addTask(task);
            task.setAsanaId(asanaId)
        }
        await RemoteTasks.pushTask(task);
        Logger.log("Added task "+task.getName()+" with id "+task.getId());
    }

    public static async removeTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        if (!task){
            Logger.error("Task "+id+" Does not exist");
            return;
        }
        if (task.getAsanaId()){
            await AsanaClient.removeTask(task.getAsanaId());
        }
        await RemoteTasks.removeById(id);
        Logger.log("Removed task "+id);
    }

    public static async startTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        if (!task){
            Logger.error("Task "+id+" Does not exist");
            return;
        }
        task.start();
        await AsanaClient.startTask(task);
        await RemoteTasks.pushTask(task);
        Logger.log("Started task "+id);
    }

    public static async completeTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        task.complete();
        await AsanaClient.completeTask(task);
        await RemoteTasks.pushTask(task);
        Logger.log("Completed task "+id);
    }

    public static async pauseTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        if (!task){
            Logger.error("Task "+id+" Does not exist");
            return;
        }
        task.pause();
        await AsanaClient.pauseTask(task);
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