import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  PrimaryKey,
  AutoIncrement,
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
@Table
export class Direction extends Model<Direction> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ description: 'Заголовок направления подготовки' })
  @Column({ allowNull: false })
  title: string;

  @ApiProperty({ description: 'Описание направления подготовки' })
  @Column({ allowNull: false })
  desc: string;

  @ApiProperty({ description: 'Связанные модели информации' })
  @HasMany(() => Info)
  info: Info[];
  public getInfos!: HasManyGetAssociationsMixin<Info>;
  public addInfo!: HasManyAddAssociationMixin<Info, number>;
  public setInfos!: HasManySetAssociationsMixin<Info, number>;
  public removeInfo!: HasManyRemoveAssociationMixin<Info, number>;
  public createInfo!: HasManyCreateAssociationMixin<Info>;
  public countInfos!: HasManyCountAssociationsMixin;
}
