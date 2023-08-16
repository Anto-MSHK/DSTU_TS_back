import { Module } from '@nestjs/common';
import { TestsService } from './test.service';
import { TestsController } from './test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { Answer } from './models/answer.model';
import { Test } from './models/test.model';
import { Way } from 'src/direction/models/way.model';
import { Criteria } from './models/criteria.model';
import { User } from 'src/user/models/user.model';
import { Direction } from 'src/direction/models/direction.model';

@Module({
  providers: [TestsService],
  controllers: [TestsController],
  imports: [
    SequelizeModule.forFeature([
      Way,
      User,
      Test,
      Question,
      Answer,
      Criteria,
      Direction,
    ]),
  ],
})
export class TestModule {}
