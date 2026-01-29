import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Profile } from "src/user/domain/entities/profile.entity";
import { ProfileRepository } from "src/user/domain/repositories/profile.repository";

@Injectable()
export class ProfilePrismaRepository implements ProfileRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(profile: Profile, userId: string){
        await this.prisma.profiles.update({
            where: {
                user_id: Number(userId)
            },
            data: {
                bio: profile.bio,
                avatar_url: profile.avatar_url
            }
        })
    }

}