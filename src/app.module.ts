import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { ProjectModule } from './projects/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // TODO: Usar configuraciones más acotadas y validadas al momento de levantar el proyecto como https://arkenv.js.org/ o https://github.com/Nikaple/nest-typed-config
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '1d',
        },
      }),
    }),
  ],
  controllers: [AppController], // TODO: Eliminar innecesario a menos que se use para un endpoint a nivel de root
  providers: [AppService], // TODO: Eliminar innecesario a menos que se use para un endpoint a nivel de root
})
export class AppModule {}
