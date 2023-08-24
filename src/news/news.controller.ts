import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { News } from './news.model';
import { NewsService } from './news.service';
import { Public } from 'src/auth/auth.decorator';
import { Roles } from 'src/user/role.decorator';
import { Role } from 'src/user/models/user.model';
import { CreateNewsDto } from './dto/CreateNewsDto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Public()
  @Get('/all')
  @ApiOperation({
    summary: 'получить список всех новостей',
    description:
      'Запрос для получения всех новостей сервиса. Доступ имеют все.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список всех новостей успешно получен',
    type: [News],
  })
  async findAllNews(): Promise<News[]> {
    return this.newsService.findAllNews();
  }

  @Public()
  @Get('/:newsId')
  @ApiOperation({
    summary: 'получить конкретную новость',
    description:
      'Запрос для получения конкретной новости сервиса. Доступ имеют все.',
  })
  @ApiResponse({
    status: 200,
    description: 'Новость успешно получена',
    type: [News],
  })
  async findNews(@Param('newsId') newsId: number): Promise<News> {
    return this.newsService.findNews(newsId);
  }

  @Post('/')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'cоздать новость' })
  @ApiResponse({
    status: 201,
    description: 'Новость успешно создана',
    type: News,
  })
  async createTest(@Request() req, @Body() data: CreateNewsDto): Promise<News> {
    return await this.newsService.createNews(req.user.id, data);
  }

  @Delete('/:newsId')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'удалить новость' })
  @ApiResponse({
    status: 201,
    description: 'Новость успешно удалена',
    type: News,
  })
  async deleteTest(@Param('newsId') newsId: number): Promise<number> {
    return await this.newsService.deleteNews(newsId);
  }
}
