import { Module } from '@nestjs/common';
import { TestsService } from './test.service';
import { TestsController } from './test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { Answer } from './models/answer.model';
import { Test } from './models/test.model';
import { Way } from 'src/direction/models/way.model';
import { Criteria } from './models/criteria.model';

@Module({
  providers: [TestsService],
  controllers: [TestsController],
  imports: [
    SequelizeModule.forFeature([Way, Test, Question, Answer, Criteria]),
  ],
})
export class TestModule {}
