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
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await PasswordVO.compare(password, user.password);

    if (!isPasswordValid) {
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
