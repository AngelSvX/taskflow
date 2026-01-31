import { Inject, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "src/projects/domain/repositories/project.repository";

export class FindProjectByIdUseCase {
    constructor(
        @Inject(ProjectRepository)
        private readonly projectRepository: ProjectRepository,
    ){}

    async execute(id: string){
        const project = await this.projectRepository.findById(id);

        if(!project){
            throw new NotFoundException("Project not found");
        }

        return project;
    }

}