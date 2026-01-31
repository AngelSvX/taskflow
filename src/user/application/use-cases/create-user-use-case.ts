import { ConflictException, Inject } from '@nestjs/common';
import { Profile } from 'src/user/domain/entities/profile.entity';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { PasswordVO } from 'src/user/domain/value-objects/password.vo';
import { CreateUserRequestDto } from 'src/user/presentation/dto/request/create-user.dto';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(user: CreateUserRequestDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(user.email);

    // TODO: Usar logger de nestjs
    console.log('Usuario desde el use case', user);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await PasswordVO.create(user.password);

    const newUser = new User(
      null,
      user.name,
      user.email,
      hashedPassword,
      user.position,
      { bio: user.bio } as Profile,
    );

    console.log('Position desde el use case', user.position);

    await this.userRepository.create(newUser);
  }
}
