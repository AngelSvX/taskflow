import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import bcrypt from 'bcrypt';
import { CreateUserRequestDto } from 'src/user/presentation/dto/request/create-user.dto';
import { Inject } from '@nestjs/common';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(user: CreateUserRequestDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User(null, user.name, user.email, hashedPassword);

    await this.userRepository.create(newUser);
  }
}
