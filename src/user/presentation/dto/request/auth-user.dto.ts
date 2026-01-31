import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
