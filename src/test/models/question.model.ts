import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Test } from './test.model';
import { Answer } from './answer.model';
import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';

export enum QuestionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  FILL = 'fill',
}

@Table
export class Question extends Model {
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
    type: DataType.ENUM,
    values: Object.values(QuestionType),
    allowNull: false,
  })
  type: QuestionType;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
  })
  testId: number;

  @BelongsTo(() => Test)
  test: Test;

  @HasMany(() => Answer)
  answers: Answer[];
  public getAnswers!: HasManyGetAssociationsMixin<Answer>;
  public addAnswer!: HasManyAddAssociationMixin<Answer, number>;
  public setAnswers!: HasManySetAssociationsMixin<Answer, number>;
  public removeAnswer!: HasManyRemoveAssociationMixin<Answer, number>;
  public createAnswer!: HasManyCreateAssociationMixin<Answer>;
  public countAnswers!: HasManyCountAssociationsMixin;
}
