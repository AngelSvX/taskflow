import { Project } from 'src/projects/domain/entities/project.entity';

export class GetProjectResponseDto {
  code: number;
  status: string;
  message: string;
  data: Project;
}
