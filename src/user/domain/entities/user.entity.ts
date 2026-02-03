import { Project } from "src/projects/domain/entities/project.entity";
import { Profile } from "./profile.entity";

export class User {
  private constructor(
    public readonly id: string | null,
    public name: string,
    public email: string,
    public password: string,
    public position: string,
    public profile: Profile | null,
    public projects?: Project[] | null,
  ) {}

  // Static Factory Methods :D

  static create(
    id: string | null,
    name: string,
    email: string,
    password: string,
    position: string,
    profile: Profile | null,
  ) {
    return new User(id, name, email, password, position, profile);
  }

  static update(
    id: string,
    name: string,
    email: string,
    password: string,
    position: string,
    profile: Profile | null,
  ) {
    return new User(id, name, email, password, position, profile);
  }

}
