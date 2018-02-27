import {Tasks} from "./Tasks";
import * as Chalk from 'chalk';
import {Spinner} from "../../core/Spinner";
export class Task {
    name: string;
    status: TaskStatus;
    startTime: Date;
    completionTime: Date;
    notes: string[];
    description: string;
    id: number;
    asanaId: number;
    group: string;
    priority: number;
    added: Date;

    constructor(taskName: string,
                description?: string,
                notes?: string[],
                id?: number,
                status?: TaskStatus,
                group?: string,
                priority?: number,
                added?: string,
                asanaId?: number) {

        this.name = taskName;
        this.description = description;
        this.notes = notes || [];
        this.group = group || Tasks.DEFAULT_GROUP;
        this.priority = priority || Tasks.DEFAULT_PRIORITY;
        this.added = added ? new Date(added) : new Date();
        if (status == null) {
            this.status = TaskStatus.DEFINED;
        }
        else {
            this.status = status;
        }

        if (id == null) {
            this.id = Math.floor(Math.random() * 1000000);
        }
        else {
            this.id = id;
        }
        this.asanaId = asanaId;
    }

    addNote(note: string) {
        this.notes.push(note);
    }

    getNotes() {
        return this.notes;
    }

    setDescription(description: string) {
        this.description = description;
    }

    toJson(): any {
        return {
            name: this.name,
            status: this.status,
            startTime: this.startTime ? this.startTime.toDateString() : null,
            notes: this.notes,
            completionTime: this.completionTime ? this.completionTime.toDateString() : null,
            description: this.description.toString(),
            group: this.group,
            priority: this.priority == -1 ? Tasks.DEFAULT_PRIORITY_DISPLAY : this.priority.toString(),
            added: this.added,
            asanaId: this.asanaId ? this.asanaId.toString() : null
        }

    }

    setStatus(status: TaskStatus): void {
        this.status = status;
    }

    start(): void {
        this.startTime = new Date();
        this.setStatus(TaskStatus.STARTED);
    }

    complete(): void {
        this.completionTime = new Date();
        if (this.status == TaskStatus.DEFINED) {
            Spinner.info("Completing a task that was not started or paused!")
        }
        this.setStatus(TaskStatus.COMPLETED);
    }

    pause(): void {
        this.setStatus(TaskStatus.PAUSED)
    }

    getId(): string {
        return this.id.toString();
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getStatus(): TaskStatus {
        return this.status;
    }

    isCompleted(): boolean {
        return this.status == TaskStatus.COMPLETED;
    }

    getGroup(): string {
        if (!this.group) {
            return Tasks.DEFAULT_GROUP;
        }
        return this.group;
    }

    getColoredStatus(): any {
        switch (this.status) {
            case TaskStatus.STARTED:
                //noinspection TypeScriptValidateTypes,TypeScriptUnresolvedFunction
                return Chalk.bold.green(this.status);
            case TaskStatus.PAUSED:
                //noinspection TypeScriptValidateTypes,TypeScriptUnresolvedFunction
                return Chalk.bold.yellow(this.status);
            default:
                return this.status;
        }

    }

    getPriority(): string {
        if (this.priority != -1) {
            return this.priority.toString();
        }
        else {
            return "-";
        }
    }

    getPriorityAsNumber(): number{
        return this.priority;
    }

    getDateAdded(): Date {
        return this.added;
    }

    getDateCompleted(): Date {
        return this.completionTime;
    }

    setPriority(priority: number): void {
        this.priority = priority;
    }

    setAsanaId(asanaId: number): void {
        this.asanaId = asanaId;
    }

    getAsanaId(): string {
        return this.asanaId ? this.asanaId.toString() : null;
    }
}

//============================================== TASK STATUS =========================================================

export enum TaskStatus {
    DEFINED = "Defined",
    STARTED = "Started",
    PAUSED = "Paused",
    COMPLETED = "Completed"
}
