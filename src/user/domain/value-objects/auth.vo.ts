import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class AuthVO {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(id: string | null, email: string, name: string, role: string) {
    const token = this.jwtService.sign(
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

    return token;
  }

  async verify(token: string) {
    const decodedToken = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });

    return decodedToken;
  }
}
