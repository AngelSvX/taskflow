import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { CreateUserRequestDto } from 'src/user/presentation/dto/request/create-user.dto';
import { ConflictException, Inject } from '@nestjs/common';
import { Profile } from 'src/user/domain/entities/profile.entity';
import { ProfileRepository } from 'src/user/domain/repositories/profile.repository';
import { PasswordVO } from 'src/user/domain/value-objects/password.vo';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository
  ) {}

  async execute(user: CreateUserRequestDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await PasswordVO.create(user.password)

    const newUser = new User(null, user.name, user.email, hashedPassword, user.position);

    const userCreated = await this.userRepository.create(newUser);

    // const profile = new Profile(null, Number(userCreated), "I'm new here!", `https://ui-avatars.com/api/?name=${user.name}?background=0D8ABC&color=fff`);

    // await this.profileRepository.create(profile)

  }
}
