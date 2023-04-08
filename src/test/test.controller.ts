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

@ApiTags('tests')
@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать тест' })
  @ApiResponse({ status: 201, description: 'Тест успешно создан' })
  create(@Body('name') name: string): Promise<Test> {
    return this.testsService.create(name);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех тестов' })
  @ApiResponse({ status: 200, description: 'Список тестов успешно получен' })
  findAll(): Promise<Test[]> {
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
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Test> {
    const test = await this.testsService.update(+id, name);
    if (!test) {
      throw new NotFoundException('Тест не найден');
    }
    return test;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить тест по ID' })
  @ApiResponse({ status: 200, description: 'Тест успешно удален' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.testsService.remove(+id);
  }
}
