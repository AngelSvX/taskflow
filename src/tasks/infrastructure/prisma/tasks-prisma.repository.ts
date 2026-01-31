import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Task } from "src/tasks/domain/entities/tasks.entity";
import { TaskRepository } from "src/tasks/domain/repositories/tasks.repository";

@Injectable()
export class TaskPrismaRepository implements TaskRepository{
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(task: Task): Promise<void> {
        console.log(task)
        await this.prismaService.tasks.create({
            data: {
                project_id: task.project_id,
                title: task.title,
                is_completed: task.is_completed,
                due_date: task.due_date,
            }
        })
    }

}