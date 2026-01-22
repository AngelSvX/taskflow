export class Profile { 
    constructor(
        public readonly id: string,
        public user_id: number,
        public bio: string,
        public avatar_url: string,
    ) { }
}
