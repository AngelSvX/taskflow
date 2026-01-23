import { Inject } from "@nestjs/common";
import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";

export class FindUserByIdUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async execute(id: string): Promise<User>{
        const user = await this.userRepository.findById(id);

        if(!user){
            throw new Error('User not found');
        }

        return user;
    }

}