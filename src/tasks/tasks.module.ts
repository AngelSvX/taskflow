import { Module } from "@nestjs/common";
import { TasksController } from "./presentation/tasks.controller";
import { CreateTaskUseCase } from "./application/use-cases/create-task-use-case";
import { TaskRepository } from "./domain/repositories/tasks.repository";
import { TaskPrismaRepository } from "./infrastructure/prisma/tasks-prisma.repository";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    {
        provide: TaskRepository,
        useClass: TaskPrismaRepository,
    }    
],
  exports: [],
})

export class TasksModule {}