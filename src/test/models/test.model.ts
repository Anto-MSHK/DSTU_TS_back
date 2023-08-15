import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from './question.model';
import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';
import { Way } from 'src/direction/models/way.model';
import { CreateTestDto } from '../dto/createTestDto';
import { CreateQuestionDto } from '../dto/createQuestionDto';
import { ApiProperty } from '@nestjs/swagger';
import { Criteria } from './criteria.model';
import { CreateCriteriaDto } from '../dto/createCriteriaDto';

@Table({
  defaultScope: {
    include: [{ model: Question, as: 'questions' }],
  },
})
export class Test extends Model<Test, CreateTestDto> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'имя теста',
    example: 'Тест на знание IOS',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'описнание теста',
    example: 'Всякие бла бла',
  })
  @Column({
    type: DataType.TEXT,
  })
  desc: string;

  @ApiProperty({
    description: 'вопросы теста',
    type: [Question],
  })
  @HasMany(() => Question)
  questions: Question[];
  public getQuestions!: HasManyGetAssociationsMixin<Question>;
  public addQuestion!: HasManyAddAssociationMixin<CreateQuestionDto, number>;
  public setQuestions!: HasManySetAssociationsMixin<Question, number>;
  public removeQuestion!: HasManyRemoveAssociationMixin<Question, number>;
  public createQuestion!: HasManyCreateAssociationMixin<Question>;
  public countQuestions!: HasManyCountAssociationsMixin;

  @ApiProperty({
    description: 'критерии теста',
    type: [Criteria],
  })
  @HasMany(() => Criteria)
  criteria: Criteria[];
  public getCriterias!: HasManyGetAssociationsMixin<Question>;
  public addCriteria!: HasManyAddAssociationMixin<CreateCriteriaDto, number>;
  public setCriterias!: HasManySetAssociationsMixin<Criteria, number>;
  public removeCriteria!: HasManyRemoveAssociationMixin<Criteria, number>;
  public createCriteria!: HasManyCreateAssociationMixin<Criteria>;
  public countCriterias!: HasManyCountAssociationsMixin;

  @ForeignKey(() => Way)
  @Column({
    type: DataType.INTEGER,
  })
  wayId: number;

  @BelongsTo(() => Way, {
    foreignKey: 'wayId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  way: Way;
}
