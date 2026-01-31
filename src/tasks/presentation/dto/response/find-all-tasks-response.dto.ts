import { Task } from "src/tasks/domain/entities/tasks.entity";

export class FindAllTasksResponseDTO{
    code: number;
    status: string;
    message: string;
    data: Task[];
}