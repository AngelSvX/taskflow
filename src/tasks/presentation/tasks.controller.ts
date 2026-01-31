import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Task } from "../domain/entities/tasks.entity";
import { CreateTaskUseCase } from "../application/use-cases/create-task-use-case";
import { CreateTaskResponseDTO } from "./dto/response/create-task-response.dto";
import { FindAllTasksUseCase } from "../application/use-cases/find-all-tasks-use-case";
import { FindAllTasksResponseDTO } from "./dto/response/find-all-tasks-response.dto";
import { FindTaskByIdUseCase } from "../application/use-cases/find-task-by-id-use-case";
import { FindTaskByIdResponseDTO } from "./dto/response/find-task-by-id-response.dto";

@Controller("/tasks")
export class TasksController{
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly findAllTasksUseCase: FindAllTasksUseCase,
        private readonly findByIdUseCase: FindTaskByIdUseCase
    ){}
    @Post("/create")
    async create(@Body() task: Task): Promise<CreateTaskResponseDTO>{
        await this.createTaskUseCase.execute(task);
        return {
            code: 201,
            status: "success",
            message: "Task created successfully"
        }
    }

    @Get("/find/all")
    async findAll(): Promise<FindAllTasksResponseDTO>{
        const tasks = await this.findAllTasksUseCase.execute();

        return {
            code: 200,
            status: "success",
            message: "Tasks found successfully",
            data: tasks
        }
    }

    @Get("/find/:id")
    async findById(@Param("id") id: string): Promise<FindTaskByIdResponseDTO>{
        const task = await this.findByIdUseCase.execute(Number(id));

        return {
            code: 200,
            status: "success",
            message: "Task found successfully",
            data: task
        }
    }

}