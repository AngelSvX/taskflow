import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateProjectUseCase } from "../application/use-cases/create-project-use-case";
import { FindProjectByIdUseCase } from "../application/use-cases/find-project-by-id-use-case";
import { FindProjectByUserIdUseCase } from "../application/use-cases/find-project-by-user-use-case";
import { Project } from "../domain/entities/project.entity";
import { CreateProjectResponseDto } from "./dto/response/create-project-response.dto";
import { GetProjectResponseDto } from "./dto/response/get-project-response.dto";
import { GetProjectsResponseDto } from "./dto/response/get-projects-response.dto";

@Controller('/projects')
export class ProjectController {
    constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly findProjectByIdUseCase: FindProjectByIdUseCase,
        private readonly findProjectsByUserIdUseCase: FindProjectByUserIdUseCase,
    ){}

    @Post("/create")
    async createProject(@Body() project: Project): Promise<CreateProjectResponseDto>{
        await this.createProjectUseCase.execute(project);

        return {
            code: 201,
            status: "success",
            message: "Project created successfully",
        }

    }

    @Get("/find/:id")
    async findProjectById(@Param("id") id: string): Promise<GetProjectResponseDto>{
        const project = await this.findProjectByIdUseCase.execute(id);

        return {
            code: 200,
            status: "success",
            message: "Project found successfully",
            data: project,
        }

    }

    @Get("/findAll/:id")
    async findProjectsByUserId(@Param("id") id: string): Promise<GetProjectsResponseDto>{
        const projects = await this.findProjectsByUserIdUseCase.execute(id);

        return {
            code: 200,
            status: "success",
            message: "Projects found successfully",
            data: projects,
        }
    }

}