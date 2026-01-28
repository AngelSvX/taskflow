import { Profile } from "../entities/profile.entity";

export abstract class ProfileRepository {
    abstract create(profile: Profile): Promise<void>;
}