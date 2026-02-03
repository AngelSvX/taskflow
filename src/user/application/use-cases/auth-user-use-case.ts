import { Inject, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PasswordVO } from "src/user/domain/value-objects/password.vo";
import { AuthVO } from "src/user/domain/value-objects/auth.vo";

export class AuthUserUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async execute(email: string, password: string): Promise<string>{
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new NotFoundException("Wrong data");
        }

        const isPasswordValid = await PasswordVO.compare(password, user.password)

        if(!isPasswordValid){
            throw new NotFoundException("Wrong data");
        }

        const authVO = new AuthVO(this.jwtService, this.configService)

        const token = await authVO.signIn(user.id, user.email, user.name, user.position)

        return token;
    }

}