import { IsString } from "class-validator";

export class UpdateProfileRequestDto {
    @IsString()
    bio: string;
    
    @IsString()
    avatar_url: string;
}