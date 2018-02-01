import {Logger} from "../../core/Logger";
export class Task {
    name: string;
    status: TaskStatus;
    startTime: Date;
    completionTime: Date;
    notes: string[];
    description: string;
    id: number;

    constructor(taskName: string, description?: string, notes?: string[], id?: number, status?:TaskStatus) {
        this.name = taskName;
        this.description = description;
        this.notes = notes || [];
        if (status == null){
            this.status = TaskStatus.DEFINED;
        }
        else {
            this.status = status;
        }

        if (id == null) {
            this.id = Math.floor(Math.random() * 10000);
        }
        else {
            this.id = id;
        }
    }

    addNote(note: string) {
        this.notes.push(note);
    }

    setDescription(description: string) {
        this.description = description;
    }

    toJson(): any {
        Logger.log(this.description);
        return {
            name: this.name,
            status: this.status,
            startTime: this.startTime? this.startTime.toString(): null,
            notes: this.notes,
            completionTime: this.completionTime? this.completionTime.toString(): null,
            description: this.description.toString()
        }
    }

    setStatus(status: TaskStatus): void {
        this.status = status;
    }

    start(): void {
        this.startTime = new Date();
        this.setStatus(TaskStatus.STARTED);
    }

    complete(): void{
        this.completionTime = new Date();
        this.setStatus(TaskStatus.COMPLETED);
    }

    pause(): void{
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
}

//============================================== TASK STATUS =========================================================

export enum TaskStatus {
    DEFINED = "Defined",
    STARTED = "Started",
    PAUSED = "Paused",
    COMPLETED = "Completed"
}
