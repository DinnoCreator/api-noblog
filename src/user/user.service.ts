import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.password;

    return user;
  }

  async deleteUser(userId: number){
      await this.prisma.post.deleteMany({
        where: {
          authorId: userId,
        }
      })

      await this.prisma.user.delete({
        where: {
          id: userId,
        }
      })

      return {status: 'successful'}
  }
}