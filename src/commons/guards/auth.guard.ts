import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization;

        if(!token){
            throw new UnauthorizedException("Token no proporcionado");
        }

        const tokenWithoutBearer = token.split(' ')[1];

        try {
            const decodedToken = this.jwtService.verify(tokenWithoutBearer, {
                secret: this.configService.get('JWT_SECRET'),
            })
            request.user = decodedToken;
            return true;
        } catch (error) {
            throw new UnauthorizedException("Token inválido");
        }
    }
}