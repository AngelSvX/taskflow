import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Project } from "src/projects/domain/entities/project.entity";
import { ProjectRepository } from "src/projects/domain/repositories/project.repository";

@Injectable()
export class ProjectPrismaRepository implements ProjectRepository{
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(project: Project): Promise<void> {
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
        });

        if(!project){
            return null;
        }

        return new Project(project.id, project.user_id, project.title, project.description);

    }

    async findByUserId(userId: string): Promise<Project[]> {
        const projects = await this.prismaService.projects.findMany({
            where: {
                user_id: Number(userId),
            },
        });

        return projects.map((project) => new Project(project.id, project.user_id, project.title, project.description));
    }

}