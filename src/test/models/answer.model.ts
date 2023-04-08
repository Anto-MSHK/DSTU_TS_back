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

@Table
export class Answer extends Model<Answer, CreateAnswerDto> {
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
    description: 'это правильный ответ?',
    example: false,
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isCorrect: boolean;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
  })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;
}
