import {RemoteTasks} from "./RemoteTasks";
import {Task, TaskStatus} from "./Task";
import {TextFiles} from "../../utils/TextFiles";
import {Files} from "../../utils/Files";
import {MailClient} from "./MailClient";
var fs = require('fs');
var readline = require('readline');
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

export class Reports {

    public static async tasksAddedToday():Promise<Task[]>{
        let tasks:Task[] = await RemoteTasks.fetchAll();
        return new Promise<Task[]>(resolve=>{
            let tasksAddedToday: Task[] = [];
            let now = new Date();
            for (let task of tasks){
                var diff = new Date(now.getTime() - task.getDateAdded().getTime());
                if (diff.getUTCDate() - 1<1){
                    tasksAddedToday.push(task);
                }
            }
            resolve(tasksAddedToday);
        })

    }

    public static async tasksCurrentlyPaused():Promise<Task[]>{
        let tasksCurrentlyPaused: Task[] = [];
        let tasks:Task[] = await RemoteTasks.fetchAll();
        return new Promise<Task[]>(resolve=>{
            for (let task of tasks){
                if (task.getStatus() == TaskStatus.PAUSED){
                    tasksCurrentlyPaused.push(task);
                }
            }
            resolve(tasksCurrentlyPaused);
        });

    }

    public static async tasksCurrentlyInStartedStatus():Promise<Task[]>{
        let tasksCurrentlyStarted: Task[] = [];
        let tasks:Task[] = await RemoteTasks.fetchAll();
        return new Promise<Task[]>(resolve=> {
            for (let task of tasks) {
                if (task.getStatus() == TaskStatus.STARTED) {
                    tasksCurrentlyStarted.push(task);
                }
            }
            resolve(tasksCurrentlyStarted);
        });
    }

    public static async tasksCompletedToday():Promise<Task[]>{
        let tasksCompletedToday: Task[] = [];
        let tasks:Task[] = await RemoteTasks.fetchAll();
        let now = new Date();
        return new Promise<Task[]>(resolve=> {
            for (let task of tasks) {
                var diff = new Date(now.getTime() - task.getDateCompleted().getTime());
                if (diff.getUTCDate() - 1 < 1) {
                    tasksCompletedToday.push(task);
                }
            }
            resolve(tasksCompletedToday);
        });
    }

    public static async sendReport(){
        let tasksStartedToday = await this.tasksCurrentlyInStartedStatus();
        let tasksCurrentlyPaused = await this.tasksCurrentlyPaused();

        let testMessage = "Tasks started today:<br><br>";
        for (let task of tasksStartedToday){
            testMessage = testMessage +task.getId()+" "+task.getName()+" "+task.getDescription()+"<br>";
        }
        testMessage = testMessage+"<br> Tasks currently paused:<br><br>";
        for (let task of tasksCurrentlyPaused){
            testMessage = testMessage +task.getId()+" "+task.getName()+" "+task.getDescription()+"<br>";
        }

        //MailClient.sendMail(testMessage);
    }





}