import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  Body,
  Param,
  UseFilters,
  ForbiddenException,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { LoginMiddleware } from 'src/login.middleware';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { DataInterceptor } from 'src/data/data.interceptor';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@Controller('user')
@UseGuards(LoginMiddleware)
export class UserController {
  constructor(private userService: UserService) {}

  // 通过数据库查询用户list
  @Get('list')
  @SetMetadata('role', ['admin'])
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(DataInterceptor)
  getList(): Promise<User[]> {
    // throw new ForbiddenException('');
    return this.userService.getList();
  }

  @ApiTags('分页查询')
  @Get('pageList')
  @ApiParam({ name: 'page', type: String, description: '页数' })
  @ApiParam({ name: 'pagesize', type: String, description: '数量' })
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
