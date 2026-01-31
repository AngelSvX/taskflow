import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthVO } from 'src/user/domain/value-objects/auth.vo';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token has not been provided :(');
    }

    const tokenWithoutBearer = token.split(' ')[1];

    try {
      const authVO = new AuthVO(this.jwtService, this.configService);

      const decodedToken = await authVO.verify(tokenWithoutBearer);

      request['user'] = decodedToken;
      return true;
    } catch (err) {
      this.logger.error(err);

      throw new UnauthorizedException('Invalid Token :(');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
