import { Profile } from "../entities/profile.entity";

export abstract class ProfileRepository {
    abstract update(profile: Profile, userId: string): Promise<void>;
}