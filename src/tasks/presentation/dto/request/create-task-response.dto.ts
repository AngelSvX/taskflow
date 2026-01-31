import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateTaskRequestDTO{
    @IsNumber()
    projectId: number;
    @IsString()
    title: string;
    @IsBoolean()
    isCompleted: boolean;
    @IsString()
    dueDate: string;
}