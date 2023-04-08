import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  HasOne,
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
import { Way } from './way.model';
import { CreateDirectionDto } from '../dto/createDirectionDto';
import { CreateWayDto } from '../dto/createWayDto';
import { CreateInfoDto } from '../dto/createInfoDto';
import { Test } from 'src/test/models/test.model';
@Table({
  defaultScope: {
    include: [
      { model: Info, as: 'infos' },
      { model: Way, as: 'ways' },
    ],
  },
})
export class Direction extends Model<Direction, CreateDirectionDto> {
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
  infos: Info[];
  public getInfos!: HasManyGetAssociationsMixin<Info>;
  public addInfo!: HasManyAddAssociationMixin<CreateInfoDto, number>;
  public setInfos!: HasManySetAssociationsMixin<Info, number>;
  public removeInfo!: HasManyRemoveAssociationMixin<Info, number>;
  public createInfo!: HasManyCreateAssociationMixin<Info>;
  public countInfos!: HasManyCountAssociationsMixin;

  @ApiProperty({ description: 'Связанные модели пути' })
  @HasMany(() => Way)
  ways: Way[];
  public getWays!: HasManyGetAssociationsMixin<Way>;
  public addWay!: HasManyAddAssociationMixin<CreateWayDto, number>;
  public setWays!: HasManySetAssociationsMixin<Way, number>;
  public removeWay!: HasManyRemoveAssociationMixin<Way, number>;
  public createWay!: HasManyCreateAssociationMixin<Way>;
  public countWays!: HasManyCountAssociationsMixin;
}
