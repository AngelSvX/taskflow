import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user-use-case';
import { CreateUserRequestDto } from './dto/request/create-user.dto';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id-use-case';
import { FindUserByIdResponseDto } from './dto/response/find-user-by-id-response.dto';
import { FindUserByEmailUseCase } from '../application/use-cases/find-user-by-email-use-case';
import { FindUserByEmailResponseDto } from './dto/response/find-user-by-email-response.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.dto';
import { UpdateUserResponseDto } from './dto/response/update-user-response.dto';
import { UpdateUserUseCase } from '../application/use-cases/update-user-use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  @Post('/create')
  async createUser(
    @Body() user: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    await this.createUserUseCase.execute(user);
    return {
      code: '201',
      status: 'success',
      message: 'User created successfully',
    };
  }

  @Post('/find/email')
  async findUserByEmail(@Body("email") email: string): Promise<FindUserByEmailResponseDto>{
    const user = await this.findUserByEmailUseCase.execute(email);
    return {
      code: 200,
      status: 'success',
      message: 'User found successfully',
      method: 'EMAIL',
      data: {
        id: user.id || '',
        name: user.name,
        email: user.email,
      }
    }    
  }

  @Patch("/update/:id")
  async updateUser(@Body() user: UpdateUserRequestDto, @Param('id') id: string): Promise<UpdateUserResponseDto> {
    await this.updateUserUseCase.execute(id, user);
    return {
      code: 200,
      status: 'success',
      message: 'User updated successfully',
      data: {
        id,
        name: user.name,
        email: user.email,
      }
    };
  }

  @Get('/find/:id')
  async findUserById(@Param('id') id: string): Promise<FindUserByIdResponseDto> {
    const user = await this.findUserByIdUseCase.execute(id);
    return {
      code: 200,
      status: 'success',
      message: 'User found successfully',
      method: 'ID',
      data: {
        id,
        name: user.name,
        email: user.email,
      }
    }
  }

}
