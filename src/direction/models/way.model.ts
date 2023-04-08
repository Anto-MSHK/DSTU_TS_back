import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Info } from './info.model';
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
import { Test } from 'src/test/models/test.model';
import { Direction } from './direction.model';
import { CreateWayDto } from '../dto/createWayDto';
import { CreateTestDto } from 'src/test/dto/createTestDto';
@Table({
  defaultScope: {
    include: [{ model: Test, as: 'tests' }],
  },
})
export class Way extends Model<Way, CreateWayDto> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({
    description: 'названия пути направления подготовки',
    example: 'React-разработчик',
  })
  @Column(DataType.TEXT)
  name: string;

  @ApiProperty({
    description: 'описание пути направления подготовки',
    example: 'React-разработчик это круто',
  })
  @Column(DataType.TEXT)
  desc: string;

  @ApiProperty({ description: 'Связанные модели информации', type: [Test] })
  @HasMany(() => Test)
  tests: Test[];
  public getTests!: HasManyGetAssociationsMixin<Test>;
  public addTest!: HasManyAddAssociationMixin<CreateTestDto, number>;
  public setTests!: HasManySetAssociationsMixin<Test, number>;
  public removeTest!: HasManyRemoveAssociationMixin<Test, number>;
  public createTest!: HasManyCreateAssociationMixin<Test>;
  public countTests!: HasManyCountAssociationsMixin;

  @ForeignKey(() => Direction)
  @Column({
    type: DataType.INTEGER,
  })
  directionId: number;

  @BelongsTo(() => Direction, {
    foreignKey: 'directionId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  direction: Direction;
}
