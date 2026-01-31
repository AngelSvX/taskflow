import { Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { AuthVO } from 'src/user/domain/value-objects/auth.vo';
import { PasswordVO } from 'src/user/domain/value-objects/password.vo';

export class AuthUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    // TODO: Falta agregar el readonly
    private jwtService: JwtService,
    // TODO: Falta agregar el readonly
    private configService: ConfigService,
  ) {}

  // TODO: Cuando es autenticación los errores deben dar la menor información posible
  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // TODO: Indicar usuario y/o contraseña incorrecta
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await PasswordVO.compare(password, user.password);

    if (!isPasswordValid) {
      // TODO: Indicar usuario y/o contraseña incorrecta
      throw new NotFoundException('Contraseña incorrecta');
    }

    const authVO = new AuthVO(this.jwtService, this.configService);

    const token = await authVO.signIn(
      user.id,
      user.email,
      user.name,
      user.position,
    );

    return token;
  }
}
