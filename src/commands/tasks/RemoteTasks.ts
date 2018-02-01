import {Task} from "./Task";
import {Tasks} from "./Tasks";
import {Logger} from "../../core/Logger";
import {Observable} from 'rxjs/Observable';

export class RemoteTasks {

    private static firebaseConnect(){
        let serviceAccount = require('/Users/markfainstein/Dev/ScriptsCherryMonster/firebase.json');

        let admin = require("firebase-admin");

        //noinspection TypeScriptUnresolvedFunction
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://scriptsmonster.firebaseio.com"
        });
        return admin;
    }

    private static firebsaeDisconnect(connection){
        connection.app().delete();
    }


    public static fetchAll():Promise<Task[]>{
        //noinspection TypeScriptUnresolvedFunction
        let firebaseConnection = this.firebaseConnect();
        return new Promise<Task[]>(resolve=>{
            let tasks: Task[] = [];
            //let tasksFile = Files.file("$SCM$", "tasks.json");
            //let tasksFileJson = TextFiles.readJson(tasksFile);
            //let tasksJson = tasksFileJson["tasks"];
            var database = firebaseConnection.database();
            var reference = database.ref("tasks/");
            reference.once("value", (tasksJson)=>{
                let remoteTasks = tasksJson.val();
                for (let taskId in remoteTasks){
                    remoteTasks[taskId]["id"] = taskId;
                    tasks.push(Tasks.taskFromJson(remoteTasks[taskId]));
                }
                resolve(tasks);
                this.firebsaeDisconnect(firebaseConnection);
            });
        });
    }

    public static fetchById(id:string):Promise<Task>{
        //noinspection TypeScriptUnresolvedFunction
        let firebaseConnection = this.firebaseConnect();
        return new Promise<Task>(resolve=>{
            var database = firebaseConnection.database();
            var reference = database.ref("tasks/"+id);
            reference.once("value", (tasksJson)=>{
                let task:Task = new Task(tasksJson.val());
                resolve(task);
                this.firebsaeDisconnect(firebaseConnection);
            });
        });
    }

    public static removeById(id){
        let firebaseConnection = this.firebaseConnect();
        return new Promise<boolean>(resolve=>{
            let database = firebaseConnection.database();
            let reference = database.ref("tasks/"+id);
            reference.remove().then((error)=>{
                resolve(!error);
                this.firebsaeDisconnect(firebaseConnection);
            })
        });
    }

    public static push(tasks:Task[]):Observable<boolean>{
        let firebaseConnection = this.firebaseConnect();
        return new Observable<boolean>(observer=>{

            let database = firebaseConnection.database();

            for (let task of tasks){
                let reference = database.ref("tasks/"+task.getId());
                reference.update(task).then((error)=>{
                    observer.next(!error);
                    this.firebsaeDisconnect(firebaseConnection);
                })
            }

        });
    }

    public static pushTask(task:Task){
        let firebaseConnection = this.firebaseConnect();
        return new Promise<boolean>(resolve=>{
            let database = firebaseConnection.database();
            let reference = database.ref("tasks/"+task.getId());
            reference.set(task.toJson()).then((error)=>{
                resolve(!error);
                this.firebsaeDisconnect(firebaseConnection);
            })
        });

    }
}