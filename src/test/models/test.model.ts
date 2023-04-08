import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Question } from './question.model';
import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManySetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
} from 'sequelize';

@Table
export class Test extends Model {
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
  name: string;

  @HasMany(() => Question)
  questions: Question[];
  public getQuestions!: HasManyGetAssociationsMixin<Question>;
  public addQuestion!: HasManyAddAssociationMixin<Question, number>;
  public setQuestions!: HasManySetAssociationsMixin<Question, number>;
  public removeQuestion!: HasManyRemoveAssociationMixin<Question, number>;
  public createQuestion!: HasManyCreateAssociationMixin<Question>;
  public countQuestions!: HasManyCountAssociationsMixin;
}
