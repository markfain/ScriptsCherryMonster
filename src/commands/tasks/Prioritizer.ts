import {Task, TaskStatus} from "./Task";
import {Tasks} from "./Tasks";
import {RemoteTasks} from "./RemoteTasks";
import {Logger} from "../../core/Logger";
export class Prioritizer {

    private static findFirstTaskWithPriority(tasks:Task[], min?:number):Task{
        if (!min){
            min = 0;
        }
        for (let task of tasks){
            if (task.getStatus()== TaskStatus.COMPLETED){
                continue;
            }
            let priority = task.getPriorityAsNumber();
            if (priority!=-1 && priority>min){
                return task;
            }
        }
    }

    private static findTaskWithLowestPriority(tasks:Task[], min?:number):Task{
        let taskWithMinPriority = this.findFirstTaskWithPriority(tasks, min);
        if (!taskWithMinPriority){
            return null;
        }
        let minPriority = taskWithMinPriority.getPriorityAsNumber();
        if (!min){
            min = 0;
        }
        for (let task of tasks){
            if (task.getStatus()== TaskStatus.COMPLETED){
                continue;
            }
            let priority = task.getPriorityAsNumber();
            if (priority<minPriority && priority>min){
                minPriority = priority;
                taskWithMinPriority = task;
            }
        }

        if (minPriority == Tasks.DEFAULT_PRIORITY){
            return null;
        }
        else {
            return taskWithMinPriority;
        }

    }

    private static findTaskWithPriority(tasks:Task[], priority):Task{
        for (let task of tasks){
            if (task.getPriority() == priority){
                return task;
            }
        }

    }

    public static async eliminatePriority(tasks:Task[], priority:number){
        for (let task of tasks){
            if (task.getPriorityAsNumber() == priority){
                task.setPriority(Tasks.DEFAULT_PRIORITY);
                await RemoteTasks.pushTask(task);
            }
        }
    }

    public static async rePrioritize(tasks:Task[]){
        let priority = 0;
        let task = this.findTaskWithLowestPriority(tasks, 0);
        while (task){
            priority = priority +1;
            task.setPriority(priority);
            await RemoteTasks.pushTask(task);
            task = this.findTaskWithLowestPriority(tasks, priority);
        }
    }
}
