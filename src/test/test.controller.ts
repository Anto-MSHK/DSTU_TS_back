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

@ApiTags('tests')
@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post('/:wayId/add-test')
  @ApiOperation({ summary: 'Создать тест' })
  @ApiResponse({ status: 201, description: 'Тест успешно создан' })
  async createTest(
    @Param('wayId') wayId: number,
    @Body() data: CreateTestDto,
  ): Promise<Way> {
    return await this.testsService.createTest(wayId, data);
  }

  @Post('/:testId/add-question')
  @ApiOperation({ summary: 'Создать тест' })
  @ApiResponse({ status: 201, description: 'Тест успешно создан' })
  async createQuestion(
    @Param('testId') testId: number,
    @Body() data: CreateQuestionDto,
  ): Promise<Test> {
    return await this.testsService.createQuestion(+testId, data);
  }

  @Post('/:questionId/add-answer')
  @ApiOperation({ summary: 'Создать тест' })
  @ApiResponse({ status: 201, description: 'Тест успешно создан' })
  async createAnswer(
    @Param('questionId') questionId: number,
    @Body() data: CreateAnswerDto,
  ): Promise<Question> {
    return await this.testsService.createAnswer(+questionId, data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех тестов' })
  @ApiResponse({ status: 200, description: 'Список тестов успешно получен' })
  async findAll(): Promise<Test[]> {
    return this.testsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить тест по ID' })
  @ApiResponse({ status: 200, description: 'Тест успешно получен' })
  async findOne(@Param('id') id: string): Promise<Test> {
    const test = await this.testsService.findOne(+id);
    if (!test) {
      throw new NotFoundException('Тест не найден');
    }
    return test;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить тест по ID' })
  @ApiResponse({ status: 200, description: 'Тест успешно обновлен' })
  async update(
    @Param('id') id: number,
    @Body() data: CreateTestDto,
  ): Promise<Test> {
    return await this.testsService.updateTest(+id, data);
  }

  @Delete('/:id/del-test')
  @ApiOperation({ summary: 'Удалить тест по ID' })
  @ApiResponse({ status: 200, description: 'тест успешно удален' })
  async deleteTest(@Param('id') id: number): Promise<number> {
    return await this.testsService.deleteTest(+id);
  }

  @Delete('/:id/del-question')
  @ApiOperation({ summary: 'Удалить вопрос по ID' })
  @ApiResponse({ status: 200, description: 'вопрос успешно удален' })
  async deleteQuestion(@Param('id') id: number): Promise<number> {
    return await this.testsService.deleteQuestion(+id);
  }

  @Delete('/:id/del-answer')
  @ApiOperation({ summary: 'Удалить ответ по ID' })
  @ApiResponse({ status: 200, description: 'ответ успешно удален' })
  async deleteAnswer(@Param('id') id: number): Promise<number> {
    return await this.testsService.deleteAnswer(+id);
  }
}
