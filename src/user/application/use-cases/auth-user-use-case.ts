import { Inject, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PasswordVO } from "src/user/domain/value-objects/password.vo";

export class AuthUserUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    async execute(email: string, password: string): Promise<string>{
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new NotFoundException("Usuario no encontrado");
        }

        const isPasswordValid = await PasswordVO.compare(password, user.password)

        if(!isPasswordValid){
            throw new NotFoundException("Contraseña incorrecta");
        }

        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        }, {
            secret: this.configService.get('JWT_SECRET'),
        })

        return token;
    }

}