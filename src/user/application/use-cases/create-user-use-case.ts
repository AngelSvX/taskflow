import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { CreateUserRequestDto } from 'src/user/presentation/dto/request/create-user.dto';
import { ConflictException, Inject, Logger } from '@nestjs/common';
import { PasswordVO } from 'src/user/domain/value-objects/password.vo';
import { Profile } from 'src/user/domain/entities/profile.entity';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  private readonly logger = new Logger(CreateUserUseCase.name);

  async execute(user: CreateUserRequestDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(user.email);

    this.logger.log("Usuario desde el use-case", user);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await PasswordVO.create(user.password)

    const newUser = User.create(null, user.name, user.email, hashedPassword, user.position, {bio: user.bio} as Profile);

    await this.userRepository.create(newUser);

  }
}
