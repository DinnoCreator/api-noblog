import { Controller,Body, Get, Patch, UseGuards, Delete } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
  export class UserController {
    constructor(private userService: UserService) {}
    @Get('me')
    getMe(@GetUser() user: User) {
      return user;
    }
  
    @Patch()
    editUser(
      @GetUser('id') userId: number,
      @Body() dto: EditUserDto,
    ) {
      return this.userService.editUser(userId, dto);
    }
    @Delete()
    deleteUse(
      @GetUser('id') userId: number,
    ) {
      return this.userService.deleteUser(userId);
    }
  }

  
  
  
  