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
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    return { message: 'Success', data: user };
  }

  @Get('/')
  findAll(@Query() query: QueryUserDto) {
    const data = this.userService.findAll(query);
    return { message: 'Success', data };
  }

  @Patch('/:id')
  update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    this.userService.update(id, updateUserDto);
    return { message: 'Success' };
  }

  @Patch('/')
  updateMany(@Body() payload: UpdateBulkUserDto) {
    this.userService.updateBulk(payload);
    return { message: 'Success' };
  }

  @Delete('/:id')
  delete(@Param() id: DeleteUserDto) {
    this.userService.delete(id);
    return { message: 'Success' };
  }

  @Delete('/')
  deleteMany(@Body() ids: DeleteBulkUserDto) {
    const data = this.userService.deleteBulk(ids);
    return { message: 'Success', data };
  }
}
