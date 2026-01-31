import { Task } from "../entities/tasks.entity";

export abstract class TaskRepository{
    abstract create(task: Task): Promise<void>;
}