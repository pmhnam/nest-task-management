import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteBulkUserDto } from './dto/delete-bulk-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { QueryUserDto } from './dto/query-user-dto';
import { UpdateBulkUserDto } from './dto/update-bulk-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private userService: UsersService;
  constructor(userService: UsersService) {
    this.userService = userService;
  }

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
    return { message: 'Success' };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(id);
    return { message: 'Success', data };
  }

  @Get('/')
  async findAll(@Query() query: QueryUserDto) {
    const data = await this.userService.findAll(query);
    return { message: 'Success', data };
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(id, updateUserDto);
    return { message: 'Success', data };
  }

  @Patch('/')
  async updateMany(@Body() payload: UpdateBulkUserDto) {
    await this.userService.updateBulk(payload);
    return { message: 'Success' };
  }

  @Delete('/:id')
  delete(@Param('id') id: DeleteUserDto) {
    this.userService.delete(id);
    return { message: 'Success' };
  }

  @Delete('/')
  deleteMany(@Body() ids: DeleteBulkUserDto) {
    const data = this.userService.deleteBulk(ids);
    return { message: 'Success', data };
  }
}
