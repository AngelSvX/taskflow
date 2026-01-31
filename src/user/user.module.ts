import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { UserPrismaRepository } from './infrastructure/prisma/user-prisma.repository';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id-use-case';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email-use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user-use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user-use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-user-use-case';
import { AuthUserUseCase } from './application/use-cases/auth-user-use-case';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/commons/middlewares/auth.middleware';
import { ProfileRepository } from './domain/repositories/profile.repository';
import { ProfilePrismaRepository } from './infrastructure/prisma/profile-prisma.repository';
import { UpdateProfileUseCase } from './application/use-cases/update-profile-use-case';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindAllUserUseCase,
    AuthUserUseCase,
    UpdateProfileUseCase,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: ProfileRepository,
      useClass: ProfilePrismaRepository,
    },
    {
      provide: JwtService,
      useClass: JwtService,
    },
  ],
  exports: [],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthMiddleware).forRoutes('users/find');
  }
}
