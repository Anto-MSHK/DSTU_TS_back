import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { News } from './news.model';
import { CreateNewsDto } from './dto/CreateNewsDto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News)
    private readonly newsModel: typeof News,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAllNews(): Promise<News[]> {
    return await this.newsModel.findAll({
      order: [['updatedAt', 'DESC']],
    });
  }

  async findNews(id: number): Promise<News> {
    const candidate = await this.newsModel.findOne({ where: { id } });
    if (!candidate) throw new NotFoundException('Такой новости не существует!');
    else return candidate;
  }

  async createNews(userId: number, data: CreateNewsDto): Promise<News> {
    return await this.newsModel.create({
      text: data.text,
      title: data.title,
      userId,
    });
  }

  async deleteNews(id: number): Promise<number> {
    await this.newsModel.destroy({
      where: { id },
    });
    return id;
  }
}
