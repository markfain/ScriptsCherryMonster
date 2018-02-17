import {TextFiles} from "../../utils/TextFiles";
import {Files} from "../../utils/Files";
import {Logger} from "../../core/Logger";
import {Task} from "./Task";
import {Spinner} from "../../core/Spinner";
export class AsanaClient{

    //TODO: externalize
    private static ACCESS_TOKEN:string = "0/a2b4068ec6fb818231d7d572a1fa310a";
    private static WORKSPACE_ID:number = 476668459614204;
    private static PROJECT_ID:number = 531512670855893;
    private static STARTED_SECTION:number = 534025267190026;
    private static DEFINED_SECTION:number = 531512670855894;
    private static MY_USER:number = 531515432792521;


    private client;

    public static connect(){
        let asana = require('asana');
        return asana.Client.create().useAccessToken(this.ACCESS_TOKEN);
    }

    public static addTask(task:Task):Promise<number>{
        let client = this.connect();
        return new Promise((resolve)=>{
            var newTask = {
                name: task.name,
                assignee: "me"
            };
            client.tasks.createInWorkspace(this.WORKSPACE_ID, newTask).then((response)=>{
                client.tasks.addProject(response.id, {project:this.PROJECT_ID, section:this.DEFINED_SECTION})
                return resolve(response.id);
            });
        });
    }

    public static startTask(task:Task):Promise<boolean>{
        let client = this.connect();
        return new Promise((resolve, reject)=>{
            if (!task.getAsanaId()){
                return reject();
            }

            client.tasks.addProject(task.asanaId, {project:this.PROJECT_ID, section: this.STARTED_SECTION}).then(()=>{
                return resolve(true);
            }).catch((error)=>{
                console.log(error.value);
            });
        })

    }

    public static pauseTask(task:Task):Promise<any>{
        let client = this.connect();
        return new Promise((resolve)=>{
            if (!task.getAsanaId()){
                Spinner.info("This task is not associated with asana");
                return resolve(false);
            }
            client.tasks.addProject(task.asanaId, {project:this.PROJECT_ID, section: this.DEFINED_SECTION}).then(()=>{
                return resolve(true);
            });
        });

    }

    public static removeTask(id:string):Promise<any>{
        let client = this.connect();
        return new Promise((resolve)=>{

            client.tasks.delete(parseInt(id)).then(()=>{
                resolve(true);
            })
        });
    }

    public static completeTask(task:Task):Promise<any>{

        let client = this.connect();
        return new Promise((resolve, reject)=>{
            if (!task.getAsanaId()){
               return reject();
            }
            client.tasks.update(task.getAsanaId(), {completed: true}).catch((error)=> {
                    console.log(error.value)
                }
            ).then(()=>{
                return resolve();
            })
        });

    }

}