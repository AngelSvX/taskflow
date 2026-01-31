import { Inject } from '@nestjs/common';
import { Project } from 'src/projects/domain/entities/project.entity';
import { ProjectRepository } from 'src/projects/domain/repositories/project.repository';

export class CreateProjectUseCase {
  constructor(
    @Inject(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(project: Project): Promise<void> {
    await this.projectRepository.create(project);
  }
}
