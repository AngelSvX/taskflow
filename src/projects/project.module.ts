import { Module } from '@nestjs/common';
import { ProjectController } from './presentation/project.controller';
import { CreateProjectUseCase } from './application/use-cases/create-project-use-case';
import { FindProjectByIdUseCase } from './application/use-cases/find-project-by-id-use-case';
import { FindProjectByUserIdUseCase } from './application/use-cases/find-project-by-user-use-case';
import { ProjectRepository } from './domain/repositories/project.repository';
import { ProjectPrismaRepository } from './infrastructure/prisma/project-prisma.repository';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [
    CreateProjectUseCase,
    FindProjectByIdUseCase,
    FindProjectByUserIdUseCase,
    {
      provide: ProjectRepository,
      useClass: ProjectPrismaRepository,
    },
  ],
})
export class ProjectModule {}
