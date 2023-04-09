import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './UsersService';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'получить список всех пользователей' })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  async findAll(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'получить список всех пользователей' })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  async findById(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserById(+id);
  }
}
