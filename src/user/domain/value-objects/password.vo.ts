import bcrypt from 'bcrypt'

export class PasswordVO {
    constructor(private readonly value: string){}

    static async create( userPassword: string ): Promise<string>{
        const passwordHashed = await bcrypt.hash(userPassword, 10)
        return passwordHashed
    }

    static async compare(userPassword: string, passwordHashed: string): Promise<boolean>{
        return await bcrypt.compare(userPassword, passwordHashed)
    }

}