import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Project } from "src/projects/domain/entities/project.entity";
import { ProjectRepository } from "src/projects/domain/repositories/project.repository";
import { CreateProjectRequestDto } from "src/projects/presentation/dto/request/create-project-request.dto";

@Injectable()
export class ProjectPrismaRepository implements ProjectRepository{
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(project: CreateProjectRequestDto): Promise<void> {
        await this.prismaService.projects.create({
            data: {
                user_id: project.user_id,
                title: project.title,
                description: project.description,
            }
        })
    }

    async findById(id: string): Promise<Project | null> {
        const project = await this.prismaService.projects.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                users: true,
            }
        });

        if(!project){
            return null;
        }

        return new Project(project.id, project.user_id, project.title, project.description, project.users.name, project.users.email);

    }

    async findByUserId(userId: string): Promise<Project[]> {
        const projects = await this.prismaService.projects.findMany({
            where: {
                users: {
                    id: Number(userId)
                }
            },
            include: {
                users: true,
            }
        });

        return projects.map((project) => new Project(project.id, project.user_id, project.title, project.description, project.users.name, project.users.email));
    }

}