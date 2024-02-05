import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  Param,
  HttpCode,
  Body,
  Query,
  Headers,
} from '@nestjs/common';

@Controller('student')
export class StudentController {
  @Get('findAll')
  findAll(@Request() req): string {
    console.log(req);

    return 'Handle GET request';
  }

  @Get(':id')
  @HttpCode(201)
  findAllParams(@Param('id') id: string) {
    return {
      message: '我接受到值' + id,
    };
  }

  @Post()
  create(@Response() res): string {
    return 'Handle POST request';
  }

  @Post('addAllJson')
  createFindAllJson(@Body() data: any): any {
    console.log(data);

    return {
      message: '添加成功',
      code: 200,
      list: [data],
    };
  }

  @Get('find')
  find(
    @Query('param1') param1,
    @Query('param2') param2,
    @Headers('authorization') authorization,
  ): string {
    return '';
  }
}
