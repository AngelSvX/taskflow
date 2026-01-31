import { Body, Controller, Post } from "@nestjs/common";
import { Task } from "../domain/entities/tasks.entity";
import { CreateTaskUseCase } from "../application/use-cases/create-task-use-case";
import { CreateTaskResponseDTO } from "./dto/response/create-task-response.dto";

@Controller("/tasks")
export class TasksController{
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase
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
}