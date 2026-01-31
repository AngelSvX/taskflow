import { IsNotEmpty, IsString } from 'class-validator';

// TODO: Todos los DTO deben ser readonly ya que se debe priorizar la inmutabilidad para disminuir errores de asignación y mejor debug
export class AuthUserRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
