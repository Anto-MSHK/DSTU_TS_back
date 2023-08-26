import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from './question.model';
import { CreateAnswerDto } from '../dto/createAnswerDto';
import { ApiProperty } from '@nestjs/swagger';
import { Criteria } from './criteria.model';
import { MetaAnswerDto } from '../dto/metaAnswerDto';

@Table
export class Answer extends Model<Answer, CreateAnswerDto> {
  @ApiProperty({
    description: 'id ответа',
    example: 2,
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'текст ответа',
    example: 'Да, я чел',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ApiProperty({
    type: MetaAnswerDto,
    description: 'Метаданные ответа',
  })
  @Column(DataType.JSONB)
  meta: MetaAnswerDto;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
  })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;

  @ForeignKey(() => Criteria)
  @Column({
    type: DataType.INTEGER,
  })
  criteriaId: number;

  @ApiProperty({
    description: 'критерий',
    type: Criteria,
  })
  @BelongsTo(() => Criteria)
  criteria: Criteria;
}
