import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(user: User): Promise<void> {
    console.log("Usuario desde el prisma", user)
    await this.prisma.users.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        position: user.position,
        profiles: {
          create: {
            bio: user.profile?.bio,
            avatar_url: `https://ui-avatars.com/api/?name=${user.name}?background=0D8ABC&color=fff`,
          }
        }
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email
      },
      include: {
        profiles: true,
      },
    });

    if (!user) {
      return null;
    }

    return new User(user.id.toString(), user.name, user.email, user.password, user.position, user.profiles);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        profiles: true,
      },
    });

    if (!user) {
      return null;
    }

    return new User(user.id.toString(), user.name, user.email, user.password, user.position, null);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany(
      {
        include: {
          profiles: true,
        },
      }
    );

    return users.map(
      (user) =>
        new User(user.id.toString(), user.name, user.email, user.password, user.position, user.profiles),
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.users.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: string, user: User): Promise<void> {
    await this.prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

}
