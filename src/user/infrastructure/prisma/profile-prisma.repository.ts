import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Profile } from "src/user/domain/entities/profile.entity";
import { ProfileRepository } from "src/user/domain/repositories/profile.repository";

@Injectable()
export class ProfilePrismaRepository implements ProfileRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(profile: Profile): Promise<void> {
        
        await this.prisma.profiles.create({
            data: {
                user_id: profile.user_id,
                bio: profile.bio,
                avatar_url: profile.avatar_url,
            }
        })

    }
}