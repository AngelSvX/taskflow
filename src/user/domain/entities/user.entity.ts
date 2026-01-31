import type { Project } from 'src/projects/domain/entities/project.entity';

import type { Profile } from './profile.entity';

export class User {
  constructor(
    public readonly id: string | null,
    public name: string,
    public email: string,
    public password: string,
    public position: string,
    public profile: Profile | null,
    public projects?: Project[] | null,
  ) {}
}
