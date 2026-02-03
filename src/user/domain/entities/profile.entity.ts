export class Profile {
  private constructor(
    public readonly id: number,
    public user_id: number,
    public bio: string | null,
    public avatar_url: string | null,
  ) {}
}
