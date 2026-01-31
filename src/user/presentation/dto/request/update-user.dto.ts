import { IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @IsString()
  name?: string;

  @IsString()
  email?: string;
}
