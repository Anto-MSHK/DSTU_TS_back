import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from './question.model';

@Table
export class Answer extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

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
