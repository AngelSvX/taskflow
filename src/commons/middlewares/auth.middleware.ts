import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log('this is the middleware');
    console.log(req.headers);
    next();
  }
}
