import { Project } from "../entities/project.entity";

export abstract class ProjectRepository {
    abstract create(project: Project): Promise<void>;
    abstract findById(id: string): Promise<Project | null>;
    abstract findByUserId(userId: string): Promise<Project[]>;
}