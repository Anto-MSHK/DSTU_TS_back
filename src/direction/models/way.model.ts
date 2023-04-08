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
@Table
export class Way extends Model<Way, CreateWayDto> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ description: 'Заголовок направления подготовки' })
  @Column(DataType.TEXT)
  name: string;

  @ApiProperty({ description: 'Описание направления подготовки' })
  @Column(DataType.TEXT)
  desc: string;

  @ApiProperty({ description: 'Связанные модели информации' })
  @HasMany(() => Test)
  tests: Test[];
  public getTests!: HasManyGetAssociationsMixin<Test>;
  public addTest!: HasManyAddAssociationMixin<Test, number>;
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
