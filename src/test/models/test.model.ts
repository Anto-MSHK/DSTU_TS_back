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
import { Results } from 'src/user/models/results.model';
import { ResultsByCriteriaDTO } from 'src/user/dto/resultsByCriteria.dto';
import { InterpretationTestDto } from '../dto/interpretationTestDto';
import { MetaTestDto } from '../dto/metaTestDto';

@Table
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
    description: 'формула для подсчёта результата теста',
    example: ['g1', '-', 'g2', '+', '35'],
  })
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  formula: string[];

  @ApiProperty({
    type: [InterpretationTestDto],
    description: 'интерпретация результатов',
  })
  @Column(DataType.JSONB)
  interpretation: InterpretationTestDto[];

  @ApiProperty({
    type: MetaTestDto,
    description: 'Метаданные теста',
  })
  @Column(DataType.JSONB)
  meta: MetaTestDto;

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

  @HasMany(() => Results)
  result: Results[];
  public getResults!: HasManyGetAssociationsMixin<Results>;
  public addResult!: HasManyAddAssociationMixin<ResultsByCriteriaDTO, number>;
  public setResults!: HasManySetAssociationsMixin<Results, number>;
  public removeResult!: HasManyRemoveAssociationMixin<Results, number>;
  public createResult!: HasManyCreateAssociationMixin<Results>;
  public countResults!: HasManyCountAssociationsMixin;

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
