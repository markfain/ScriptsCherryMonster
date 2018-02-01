import {Files} from "../../utils/Files";
import {Task, TaskStatus} from "./Task";
import {TextFiles} from "../../utils/TextFiles";
import {Logger} from "../../core/Logger";
import * as Table from 'cli-table';
import {RemoteTasks} from "./RemoteTasks";
export class Tasks{

    public static taskFromJson(json:any){
        return new Task(json["name"], json["description"], json["notes"], json["id"], json["status"]);
    }

    public static async addTask(task:Task){
        await RemoteTasks.pushTask(task);
        Logger.log("Added task "+task.getName());
    }

    public static async removeTaskById(id:string){
        await RemoteTasks.removeById(id);
        Logger.log("Removed task "+id);
    }

    public static async startTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        task.start();
        await RemoteTasks.pushTask(task);
        Logger.log("Started task "+id);
    }

    public static async completeTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        task.complete();
        await RemoteTasks.pushTask(task);
    }

    public static async pauseTaskById(id:string){
        let task = await RemoteTasks.fetchById(id);
        task.pause();
        await RemoteTasks.pushTask(task);
        Logger.log("Paused task "+id);
    }

    public static async listTasks(){
        let tasks = await RemoteTasks.fetchAll();

        var table = new Table({
            head: ['ID', 'Name', 'Status']
        });

        for (let task of tasks){
            table.push([task.getId(), task.getName(), task.getStatus()]);
        }
        console.log(table.toString());

    }

    public static async addNoteToTaskById(id:string, note:string){
        let task = await RemoteTasks.fetchById(id);
        task.addNote(note);
        await RemoteTasks.pushTask(task);
        Logger.log("Added note to task "+id);
    }
}