import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../application/use-cases/create-user-use-case";
import { CreateUserRequestDto } from "./dto/request/create-user.dto";
import { CreateUserResponseDto } from "./dto/response/create-user-reponse.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) {}

    @Post('/create')
    async createUser(@Body() user: CreateUserRequestDto): Promise<CreateUserResponseDto>{
        await this.createUserUseCase.execute(user)
        return {
            code: '201',
            status: 'success',
            message: 'User created successfully'
        }

    }
}