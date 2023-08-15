import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { CreateCriteriaDto } from '../dto/createCriteriaDto';
import { ApiProperty } from '@nestjs/swagger';
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
import { CreateAnswerDto } from '../dto/createAnswerDto';

@Table
export class Criteria extends Model<Criteria, CreateCriteriaDto> {
  @ApiProperty({
    description: 'id критерия',
    example: 2,
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'название критерия',
    example: 'человек-техника',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.INTEGER,
  })
  testId: number;

  @BelongsTo(() => Test)
  test: Test;

  @HasMany(() => Answer)
  answer: Answer[];
  public getAnswers!: HasManyGetAssociationsMixin<Answer>;
  public addAnswer!: HasManyAddAssociationMixin<CreateAnswerDto, number>;
  public setAnswers!: HasManySetAssociationsMixin<Answer, number>;
  public removeAnswer!: HasManyRemoveAssociationMixin<Answer, number>;
  public createAnswer!: HasManyCreateAssociationMixin<Answer>;
  public countAnswers!: HasManyCountAssociationsMixin;
}
