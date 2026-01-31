import { Inject, NotFoundException } from "@nestjs/common";
import { Task } from "src/tasks/domain/entities/tasks.entity";
import { TaskRepository } from "src/tasks/domain/repositories/tasks.repository";

export class FindAllTasksUseCase {
    constructor(
        @Inject(TaskRepository)
        private readonly taskRepository: TaskRepository
    ) {}

    async execute(): Promise<Task[]> {
        const tasks = await this.taskRepository.findAll();

        if(!tasks){
            throw new NotFoundException('Tasks not found');
        }

        return tasks;
    }
}