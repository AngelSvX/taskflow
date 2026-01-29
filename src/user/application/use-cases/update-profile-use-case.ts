import { Inject } from "@nestjs/common";
import { Profile } from "src/user/domain/entities/profile.entity";
import { ProfileRepository } from "src/user/domain/repositories/profile.repository";

export class UpdateProfileUseCase {
    constructor(
        @Inject(ProfileRepository)
        private readonly profileRepository: ProfileRepository
    ){}

    async execute(profile: Profile, user_id: string): Promise<void>{
        await this.profileRepository.update(profile, user_id)
    }

}