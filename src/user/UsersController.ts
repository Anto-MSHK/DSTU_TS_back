import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './UsersService';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Role, User } from './models/user.model';
import { Roles } from './role.decorator';
import { AnswerLogDTO } from './dto/answerLog.dto';
import { Results } from './models/results.model';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'получить список всех пользователей' })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  async findAll(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'получить конкретного пользователя по id' })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  async findById(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserById(+id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'изменить информацию о пользователе' })
  @ApiResponse({
    status: 200,
    type: User,
  })
  async updateUser(@Param('id') id: number, @Body() data: User): Promise<User> {
    return await this.usersService.updateUser(+id, data);
  }

  @Post('/test/save/:testId')
  @ApiOperation({
    summary: 'Отправить ответы на тест',
    description: '',
  })
  @ApiBody({ type: [AnswerLogDTO] })
  @ApiResponse({
    status: 200,
    type: Results,
  })
  async saveAnswers(
    @Param('testId') testId: number,
    @Body() data: AnswerLogDTO[],
    @Request() req,
  ): Promise<Results> {
    return await this.usersService.saveAnswers(+testId, req.user.id, data);
  }
}
