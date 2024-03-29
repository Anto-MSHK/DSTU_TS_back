import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { ResultsByCriteriaDTO } from '../dto/resultsByCriteria.dto';
import { AnswerLogDTO } from '../dto/answerLog.dto';
import { Test } from 'src/test/models/test.model';

interface ResultsAttrs {
  userId: number;
  testId: number;
  byCriteria?: ResultsByCriteriaDTO[];
  answersLog?: AnswerLogDTO[];
}

@Table
export class Results extends Model<Results, ResultsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({
    type: [AnswerLogDTO],
    description: 'Журнал ответов на тест',
  })
  @Column(DataType.JSONB)
  answersLog: AnswerLogDTO[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
  })
  testId: number;

  @BelongsTo(() => Test, {
    foreignKey: 'testId',
  })
  test: Test;
}
