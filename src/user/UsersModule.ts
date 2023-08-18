import { Module } from '@nestjs/common';
import { UsersService } from './UsersService';
import { UsersController } from './UsersController';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Results } from './models/results.model';
import { Question } from 'src/test/models/question.model';
import { Answer } from 'src/test/models/answer.model';
import { Test } from 'src/test/models/test.model';
import { Criteria } from 'src/test/models/criteria.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Results,
      Question,
      Answer,
      Test,
      Criteria,
    ]),
  ],
})
export class UsersModule {}
