import { Inject } from "@nestjs/common";
import { Task } from "src/tasks/domain/entities/tasks.entity";
import { TaskRepository } from "src/tasks/domain/repositories/tasks.repository";

export class CreateTaskUseCase{
    constructor(
        @Inject(TaskRepository)
        private readonly taskRepository: TaskRepository,
    ){}

    async execute(task: Task): Promise<void>{
        await this.taskRepository.create(task);
    }

}