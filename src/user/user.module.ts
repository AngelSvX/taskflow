import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/commons/middlewares/auth.middleware';

import { AuthUserUseCase } from './application/use-cases/auth-user-use-case';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user-use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-user-use-case';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email-use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id-use-case';
import { UpdateProfileUseCase } from './application/use-cases/update-profile-use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user-use-case';
import { ProfileRepository } from './domain/repositories/profile.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { ProfilePrismaRepository } from './infrastructure/prisma/profile-prisma.repository';
import { UserPrismaRepository } from './infrastructure/prisma/user-prisma.repository';
import { UserController } from './presentation/user.controller';

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
