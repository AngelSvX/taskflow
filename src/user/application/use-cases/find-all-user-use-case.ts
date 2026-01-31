import { Inject, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

export class FindAllUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new NotFoundException('There are no users here, come back later!');
    }

    return users;
  }
}
