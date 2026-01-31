import type { Project } from 'src/projects/domain/entities/project.entity';

export class GetProjectsResponseDto {
  code: number;
  status: string;
  message: string;
  data: Project[];
}
