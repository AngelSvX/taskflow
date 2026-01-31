import { Injectable } from '@nestjs/common';

// TODO: Eliminar innecesario a menos que se use para un endpoint a nivel de root
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
