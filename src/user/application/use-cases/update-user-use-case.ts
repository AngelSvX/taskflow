import { Inject, NotFoundException } from "@nestjs/common";
import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import { UpdateUserRequestDto } from "src/user/presentation/dto/request/update-user.dto";

export class UpdateUserUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository
    ){}

    async execute(id: string, user: UpdateUserRequestDto){
        const userExists = await this.userRepository.findById(id);

        if(!userExists){
            throw new NotFoundException('User not found');
        }

        const userUpdated = new User(id, user.name || userExists.name, user.email || userExists.email, userExists.password, userExists.position);

        await this.userRepository.update(id, userUpdated);

    }
}