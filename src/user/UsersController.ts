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
import { ResultsByTestDTO } from './dto/resultsByTest.dto';
import { AllResultsDTO } from './dto/allResults.dto';
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

  @ApiOperation({
    summary: 'Отправить ответы на тест',
    description:
      'Отправлять ответы нужно в один запрос. Передаваемая нагрузка - массив с объетами, где обозначен id вопроса и массив ответов на этот вопрос от пользователя. Если ответ у вопроса только один (single), то массив будет состоять из одного элемента. Есть возможность изменять ответы: если отправить новый запрос с изменёнными ответами, то они перезапишутся.',
  })
  @ApiBody({ type: [AnswerLogDTO] })
  @ApiResponse({
    status: 200,
    type: Results,
  })
  @Post('/test/save/:testId')
  async saveAnswers(
    @Param('testId') testId: number,
    @Body() data: AnswerLogDTO[],
    @Request() req,
  ): Promise<Results> {
    return await this.usersService.saveAnswers(+testId, req.user.id, data);
  }

  @ApiOperation({
    summary: 'Получить ответы по тесту',
  })
  @ApiResponse({
    status: 200,
    type: ResultsByTestDTO,
  })
  @Get('/result/:id')
  async resultsByTest(
    @Param('id') testId: number,
    @Request() req,
  ): Promise<ResultsByTestDTO> {
    return await this.usersService.getResultsByTest(testId, req.user.id);
  }

  @ApiOperation({
    summary: 'Получить краткие ответы на все связанные с пользователем тесты',
  })
  @ApiResponse({
    status: 200,
    type: AllResultsDTO,
  })
  @Get('/test/results')
  async allResults(@Request() req): Promise<any> {
    return await this.usersService.getAllResults(req.user.id);
  }
}
