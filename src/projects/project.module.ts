import { Module } from "@nestjs/common";
import { ProjectController } from "./presentation/project.controller";

@Module({
    imports: [],
    controllers: [ProjectController],
    providers: [],
})

export class ProjectModule { }