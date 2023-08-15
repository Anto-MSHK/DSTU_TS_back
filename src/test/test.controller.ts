import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TestsService } from './test.service';
import { Test } from './models/test.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTestDto } from './dto/createTestDto';
import { CreateQuestionDto } from './dto/createQuestionDto';
import { CreateAnswerDto } from './dto/createAnswerDto';
import { Question } from './models/question.model';
import { Way } from 'src/direction/models/way.model';
import { CreateCriteriaDto } from './dto/createCriteriaDto';
import { Criteria } from './models/criteria.model';

@ApiTags('tests')
@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post('/:wayId/add-test')
  @ApiOperation({ summary: 'cоздать тест' })
  @ApiResponse({ status: 201, description: 'Тест успешно создан', type: Way })
  async createTest(
    @Param('wayId') wayId: number,
    @Body() data: CreateTestDto,
  ): Promise<Way> {
    return await this.testsService.createTest(wayId, data);
  }

  @Post('/:testId/add-question')
  @ApiOperation({ summary: 'cоздать вопрос' })
  @ApiResponse({ status: 201, description: 'Тест успешно создан', type: Test })
  async createQuestion(
    @Param('testId') testId: number,
    @Body() data: CreateQuestionDto,
  ): Promise<Test> {
    return await this.testsService.createQuestion(+testId, data);
  }

  @Post('/:questionId/add-answer')
  @ApiOperation({ summary: 'создать ответ' })
  @ApiResponse({
    status: 201,
    description: 'Тест успешно создан',
    type: Question,
  })
  async createAnswer(
    @Param('questionId') questionId: number,
    @Body() data: CreateAnswerDto,
  ): Promise<Question> {
    return await this.testsService.createAnswer(+questionId, data);
  }

  @Post('/:testId/add-criteria')
  @ApiOperation({ summary: 'создать критерий' })
  @ApiResponse({
    status: 201,
    description: 'Критерий успешно создан',
    type: Criteria,
  })
  async createCriteria(
    @Param('testId') testId: number,
    @Body() data: CreateCriteriaDto,
  ): Promise<Criteria> {
    return await this.testsService.createCriteria(testId, data);
  }

  @Get()
  @ApiOperation({ summary: 'получить список всех тестов' })
  @ApiResponse({
    status: 200,
    description: 'Список тестов успешно получен',
    type: [Test],
  })
  async findAll(): Promise<Test[]> {
    return this.testsService.findAll();
  }

  @Get('/:testId/criteria')
  @ApiOperation({ summary: 'получить список всех критериев' })
  @ApiResponse({
    status: 200,
    description: 'Список всех критериев успешно получен',
    type: [Criteria],
  })
  async findAllCriteria(@Param('testId') testId: number): Promise<Criteria[]> {
    return this.testsService.findAllCriteria(testId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'получить тест по ID' })
  @ApiResponse({
    status: 200,
    description: 'Тест успешно получен',
    type: Test,
  })
  async findOne(@Param('id') id: string): Promise<Test> {
    const test = await this.testsService.findOne(+id);
    if (!test) {
      throw new NotFoundException('Тест не найден');
    }
    return test;
  }

  @Put(':id')
  @ApiOperation({ summary: 'обновить тест по ID' })
  @ApiResponse({
    status: 200,
    description: 'Тест успешно обновлен',
    type: Test,
  })
  async update(
    @Param('id') id: number,
    @Body() data: CreateTestDto,
  ): Promise<Test> {
    return await this.testsService.updateTest(+id, data);
  }

  @Delete('/:testId/del-test')
  @ApiOperation({ summary: 'удалить тест по ID' })
  @ApiResponse({ status: 200, description: 'тест успешно удален' })
  async deleteTest(@Param('testId') testId: number): Promise<number> {
    return await this.testsService.deleteTest(+testId);
  }

  @Delete('/:questionId/del-question')
  @ApiOperation({ summary: 'удалить вопрос по ID' })
  @ApiResponse({ status: 200, description: 'вопрос успешно удален' })
  async deleteQuestion(
    @Param('questionId') questionId: number,
  ): Promise<number> {
    return await this.testsService.deleteQuestion(+questionId);
  }

  @Delete('/:answerId/del-answer')
  @ApiOperation({ summary: 'удалить ответ по ID' })
  @ApiResponse({ status: 200, description: 'ответ успешно удален' })
  async deleteAnswer(@Param('answerId') answerId: number): Promise<number> {
    return await this.testsService.deleteAnswer(+answerId);
  }
}
