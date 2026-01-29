import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
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
import { DeleteUserResponseDto } from './dto/response/delete-user-response.dto';
import { DeleteUserUseCase } from '../application/use-cases/delete-user-use-case';
import { FindAllUserUseCase } from '../application/use-cases/find-all-user-use-case';
import { FindAllUserResponseDto } from './dto/response/find-all-user-response.dto';
import { AuthUserRequestDto } from './dto/request/auth-user.dto';
import { AuthUserResponseDto } from './dto/response/auth-user-response.dto';
import { AuthUserUseCase } from '../application/use-cases/auth-user-use-case';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { UpdateProfileUseCase } from '../application/use-cases/update-profile-use-case';
import { UpdateProfileRequestDto } from './dto/request/update-profile.dto';
import { Profile } from '../domain/entities/profile.entity';
import { UpdateProfileResponseDto } from './dto/response/update-profile-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly authUserUseCase: AuthUserUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
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

  @Post('/auth')
  async authUser(@Body() user: AuthUserRequestDto ): Promise<AuthUserResponseDto>{
    const token = await this.authUserUseCase.execute(user.email, user.password);
    return {
      code: '200',
      status: 'success',
      message: 'User authenticated successfully',
      token: token,
    };
  }

  @Post('/find/email')
  @UseGuards(AuthGuard)
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
        position: user.position,
        profiles: {
          bio: user.profile?.bio || '',
          avatar_url: user.profile?.avatar_url || '', 
        }
      }
    }    
  }

  @Delete("/delete/:id")
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string): Promise<DeleteUserResponseDto>{
    await this.deleteUserUseCase.execute(id);
    return {
      code: 200,
      status: 'success',
      message: 'User deleted successfully',
    };
  }

  @Get("/find/all")
  @UseGuards(AuthGuard)
  async findAllUser(): Promise<FindAllUserResponseDto>{
    const users = await this.findAllUserUseCase.execute();
    return {
      code: 200,
      status: 'success',
      message: 'Users found successfully',
      data: users.map(user => ({
        id: user.id || '',
        name: user.name,
        email: user.email,
        position: user.position,
        profiles: {
          bio: user.profile?.bio || '',
          avatar_url: user.profile?.avatar_url || '', 
        }
      })),
    }
  }

  @Patch("/update/:id")
  @UseGuards(AuthGuard)
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

  @Patch("/updateProfile/:id")
  @UseGuards(AuthGuard)
  async updateProfile(@Body() profile: UpdateProfileRequestDto, @Param('id') id: string): Promise<UpdateProfileResponseDto>{
    await this.updateProfileUseCase.execute(profile as Profile, id);
    return {
      code: 200,
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        id,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
      }
    };
  }

  @Get('/find/:id')
  @UseGuards(AuthGuard)
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
        position: user.position,
        profiles: {
          bio: user.profile?.bio || '',
          avatar_url: user.profile?.avatar_url || '', 
        }
      }
    }
  }

}
