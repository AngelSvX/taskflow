import { Inject, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "src/projects/domain/repositories/project.repository";

export class FindProjectByUserIdUseCase {
    constructor(
        @Inject(ProjectRepository)
        private readonly projectRepository: ProjectRepository
    ){}

    async execute(userId: string){
        const projects = await this.projectRepository.findByUserId(userId);

        if(!projects){
            throw new NotFoundException("Projects not found");
        }

        return projects;
    }

}