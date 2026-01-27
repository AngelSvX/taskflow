import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @IsEmail()
  @IsString()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @MinLength(6)
  @IsString()
  name: string;

  @IsString()
  position: string;
}
