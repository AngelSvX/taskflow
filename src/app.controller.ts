import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

// TODO: Eliminar innecesario a menos que se use para un endpoint a nivel de root
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
