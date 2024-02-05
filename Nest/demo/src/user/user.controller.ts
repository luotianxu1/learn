import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // 通过数据库查询用户list
  @Get('list')
  getList(): Promise<User[]> {
    return this.userService.getList();
  }

  @Get('pageList')
  async findAll(
    @Query('page') page: number,
    @Query('pagesize') pageSize: number,
  ) {
    const [users, total] = await this.userService.findAll(page, pageSize);
    return {
      data: users,
      total,
      page,
      pageSize,
    };
  }

  // 通过id查询用户
  @Get('getUserById')
  async getUserById(@Query('id') id: string): Promise<User> {
    const userId: number = parseInt(id);
    return this.userService.getUserById(userId);
  }

  // 增加用户
  @Post('addUser')
  addUser(@Body() body): Promise<User> {
    return this.userService.addUser(body);
  }

  // 更新用户
  @Post('updateUser')
  updateUser(@Body() body): Promise<string> {
    return this.userService.updateUser(body);
  }

  // 删除用户
  @Post('deleteUser')
  delUser(@Body() body): Promise<object> {
    return this.userService.deleteUser(body);
  }
}
