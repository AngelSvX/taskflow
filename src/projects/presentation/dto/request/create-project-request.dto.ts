import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectRequestDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string | null;
}
