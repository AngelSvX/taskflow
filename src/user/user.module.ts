import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { UserPrismaRepository } from './infrastructure/prisma/user-prisma.repository';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id-use-case';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email-use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user-use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user-use-case';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
