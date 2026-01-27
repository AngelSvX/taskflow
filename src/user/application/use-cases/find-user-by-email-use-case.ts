import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import { Inject, NotFoundException } from "@nestjs/common";

export class FindUserByEmailUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ){}

    async execute(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

}