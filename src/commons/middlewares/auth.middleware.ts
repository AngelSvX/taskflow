import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    private readonly logger = new Logger(AuthMiddleware.name);
    use(req: Request, res: Response, next: (error?: any) => void) {
        this.logger.log("this is the middleware");
        this.logger.log(req.headers);
        next();
    }
} 