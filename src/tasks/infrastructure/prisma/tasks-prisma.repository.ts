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

    async findAll(): Promise<Task[]> {
        const tasks = await this.prismaService.tasks.findMany({
            include: {
                projects:{
                    select: {
                        title: true
                    }
                }
            }
        });
        return tasks.map(task => new Task(
            task.id,
            task.project_id,
            task.title,
            task.is_completed,
            task.due_date,
            task.projects.title
        ));
    }

    async findById(id: number): Promise<Task | null> {
        const task = await this.prismaService.tasks.findUnique({
            where: {
                id: id
            },
            include: {
                projects: {
                    select: {
                        title: true
                    }
                }
            }
        })

        if(!task){
            return null;
        }

        return new Task(
            task.id,
            task.project_id,
            task.title,
            task.is_completed,
            task.due_date,
            task.projects.title
        )

    }
}