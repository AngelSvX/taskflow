import { Inject, NotFoundException } from "@nestjs/common";
import { Task } from "src/tasks/domain/entities/tasks.entity";
import { TaskRepository } from "src/tasks/domain/repositories/tasks.repository";

export class FindTaskByIdUseCase {
    constructor(
        @Inject(TaskRepository)
        private readonly taskRepository: TaskRepository
    ) {}

    async execute(id: number): Promise<Task> {
        const task = await this.taskRepository.findById(id);

        if(!task){
            throw new NotFoundException('Task not found');
        }

        return task;
    }
}