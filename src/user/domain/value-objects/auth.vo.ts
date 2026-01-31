import type { JwtService } from '@nestjs/jwt';
import type { ConfigService } from '@nestjs/config';

export class AuthVO {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(
    id: string | null,
    email: string,
    name: string,
    role: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        id,
        email,
        name,
        role,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );
  }

  async verify(token: string) {
    return await this.jwtService.verifyAsync<{
      id: string | null;
      email: string;
      name: string;
      role: string;
    }>(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
