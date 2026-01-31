import { Module } from "@nestjs/common";
import { TasksController } from "./presentation/tasks.controller";
import { CreateTaskUseCase } from "./application/use-cases/create-task-use-case";
import { TaskRepository } from "./domain/repositories/tasks.repository";
import { TaskPrismaRepository } from "./infrastructure/prisma/tasks-prisma.repository";
import { FindAllTasksUseCase } from "./application/use-cases/find-all-tasks-use-case";
import { FindTaskByIdUseCase } from "./application/use-cases/find-task-by-id-use-case";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    FindAllTasksUseCase,
    FindTaskByIdUseCase,
    {
        provide: TaskRepository,
        useClass: TaskPrismaRepository,
    }    
],
  exports: [],
})

export class TasksModule {}