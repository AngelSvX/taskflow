import { Inject } from "@nestjs/common";
import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";

export class FindAllUserUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ){}

    async execute(): Promise<User[]>{
        return await this.userRepository.findAll();
    }
}