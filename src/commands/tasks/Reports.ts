import {RemoteTasks} from "./RemoteTasks";
import {Task, TaskStatus} from "./Task";
import {TextFiles} from "../../utils/TextFiles";
import {Files} from "../../utils/Files";
import {MailClient} from "./MailClient";
var fs = require('fs');
var readline = require('readline');
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

export class Reports {

    /*public static async tasksAddedToday():Task[]{
        let tasksAddedToday: Task[] = [];
        let tasks:Task[] = await RemoteTasks.fetchAll();
        let now = new Date();
        for (let task of tasks){
            var diff = new Date(now.getTime() - task.getDateAdded().getTime());
            if (diff.getUTCDate() - 1<1){
                tasksAddedToday.push(task);
            }
        }
        return tasksAddedToday;
    }

    public static async tasksCurrentlyPaused(){
        let tasksCurrentlyPaused: Task[] = [];
        let tasks:Task[] = await RemoteTasks.fetchAll();
        for (let task of tasks){
            if (task.getStatus() == TaskStatus.PAUSED){
                tasksCurrentlyPaused.push(task);
            }
        }
        return tasksCurrentlyPaused;
    }

    public static async tasksCurrentlyInStatedStatus(){
        let tasksCurrentlyStarted: Task[] = [];
        let tasks:Task[] = await RemoteTasks.fetchAll();
        for (let task of tasks){
            if (task.getStatus() == TaskStatus.STARTED){
                tasksCurrentlyStarted.push(task);
            }
        }
        return tasksCurrentlyStarted;
    }

    public static async tasksCompletedToday():Task[]{
        let tasksCompletedToday: Task[] = [];
        let tasks:Task[] = await RemoteTasks.fetchAll();
        let now = new Date();
        for (let task of tasks){
            var diff = new Date(now.getTime() - task.getDateCompleted().getTime());
            if (diff.getUTCDate() - 1<1){
                tasksCompletedToday.push(task);
            }
        }
        return tasksCompletedToday;
    }*/

    public static sendReport(){
        MailClient.sendMail();
    }





}