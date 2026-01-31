import { Task } from "../entities/tasks.entity";

export abstract class TaskRepository{
    abstract create(task: Task): Promise<void>;
    abstract findAll(): Promise<Task[]>;
    abstract findById(id: number): Promise<Task | null>;
}