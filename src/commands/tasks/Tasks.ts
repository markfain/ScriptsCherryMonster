import {Files} from "../../utils/Files";
import {Task, TaskStatus} from "./Task";
import {TextFiles} from "../../utils/TextFiles";
import {Logger} from "../../core/Logger";
import * as Table from 'cli-table';
import {RemoteTasks} from "./RemoteTasks";
import * as Chalk from 'chalk';
import {ProgressBar} from "../../core/ProgressBar";
import {AsanaClient} from "./AsanaClient";
import {Spinner} from "../../core/Spinner";
import {PrioritizeTask} from "./PrioritizeTask";
import {Prioritizer} from "./Prioritizer";
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

    public static async addTask(task:Task, isAsana):Promise<any>{
        return new Promise(async(resolve)=>{
            if (isAsana){
                let asanaId = await AsanaClient.addTask(task);
                task.setAsanaId(asanaId)
            }
            await RemoteTasks.pushTask(task);
            resolve(task.getId());
        });


    }

    public static async removeTaskById(id:string, shouldIgnoreAsana:boolean):Promise<any>{
        return new Promise(async(resolve)=> {
            let task = await RemoteTasks.fetchById(id);
            if (!task) {
                Spinner.fail("Task " + id + " does not exist");
                return;
            }
            //TODO: should be 'shouldIgnoreIntegrations' or something else
            if (task.getAsanaId() && !shouldIgnoreAsana) {
                await AsanaClient.removeTask(task.getAsanaId());
            }
            await RemoteTasks.removeById(id);

            //TODO: not the best way, maybe the prioritizer needs to fetch the tasks
            let tasks = await RemoteTasks.fetchAll(task.group || Tasks.DEFAULT_GROUP);
            await Prioritizer.rePrioritize(tasks);
            resolve(id);
        });
    }

    public static async startTaskById(id:string):Promise<any>{
        return new Promise(async(resolve)=>{
            let task = await RemoteTasks.fetchById(id);
            if (!task){
                Logger.error("Task "+id+" Does not exist");
                return;
            }
            task.start();
            try{
                await AsanaClient.startTask(task);

            }
            catch(e){
                Spinner.info("This task is not associated with asana");
            }
            await RemoteTasks.pushTask(task);
            resolve(id);
        });

    }

    public static async completeTaskById(id:string):Promise<any>{
        return new Promise(async(resolve)=>{
            let task = await RemoteTasks.fetchById(id);
            task.complete();
            try{
                await AsanaClient.completeTask(task);
            }
            catch(e){
                //Logger.log(e);
            }

            await RemoteTasks.pushTask(task);
            let tasks = await RemoteTasks.fetchAll(task.group || Tasks.DEFAULT_GROUP);
            await Prioritizer.rePrioritize(tasks);
            resolve(id);
        });

    }

    public static async pauseTaskById(id:string):Promise<any>{
        return new Promise(async(resolve)=> {
            let task = await RemoteTasks.fetchById(id);
            if (!task) {
                Spinner.fail("Task " + id + " does not exist");
                return;
            }
            task.pause();
            await AsanaClient.pauseTask(task);
            await RemoteTasks.pushTask(task);
            resolve(id);
        });
    }

    public static async listTasks(listCompletedTasks, group){
        Spinner.start("Fetching tasks...");
        let tasks = await RemoteTasks.fetchAll();
        Spinner.stop();

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
        Spinner.start("Fetching task notes...");
        let task = await RemoteTasks.fetchById(id);
        Spinner.stop();
        var table = new Table({
            head: ['#', "Note (Task '"+task.getName()+"')"]
        });
        let notes = task.getNotes();
        for (let i=0; i<notes.length; i++){
            table.push([i+1, notes[i]]);
        }
        console.log(table.toString());
    }

    public static async addNoteToTaskById(id:string, note:string):Promise<any>{
        return new Promise(async(resolve)=> {
            let task = await RemoteTasks.fetchById(id);
            task.addNote(note);
            await AsanaClient.addNote(task, note);
            await RemoteTasks.pushTask(task);
            resolve(true);
        });
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
        let group = task.getGroup();
        let tasks = await RemoteTasks.fetchAll();
        if (!group){
            tasks = this.filterTasks(tasks, (task)=>{return task.getGroup().toLowerCase() == this.DEFAULT_GROUP.toLowerCase()})
        }
        else {
            tasks = this.filterTasks(tasks, (task)=>{return task.getGroup().toLowerCase() == group.toLowerCase()})
        }
        await Prioritizer.eliminatePriority(tasks, priority);

        task.setPriority(priority);
        await RemoteTasks.pushTask(task);

    }
}