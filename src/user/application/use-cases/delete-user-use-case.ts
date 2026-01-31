import { Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

export class DeleteUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('That user does not exist! D:');
    }

    await this.userRepository.delete(id);
  }
}
