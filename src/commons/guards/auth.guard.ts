import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthVO } from 'src/user/domain/value-objects/auth.vo';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token has not been provided :(');
    }

    const tokenWithoutBearer = token.split(' ')[1];

    try {
      const authVO = new AuthVO(this.jwtService, this.configService);

      const decodedToken = authVO.verify(tokenWithoutBearer);

      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token :(');
    }
  }
}
