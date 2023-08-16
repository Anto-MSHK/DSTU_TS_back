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
} from 'sequelize';
import { Way } from './way.model';
import { CreateDirectionDto } from '../dto/createDirectionDto';
import { CreateWayDto } from '../dto/createWayDto';
import { CreateInfoDto } from '../dto/createInfoDto';
import { User } from 'src/user/models/user.model';
@Table({
  defaultScope: {
    include: ['infos', 'ways'],
  },
})
export class Direction extends Model<Direction, CreateDirectionDto> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({
    description: 'Заголовок направления подготовки',
    example: 'Frontend',
  })
  @Column({ allowNull: false })
  title: string;

  @ApiProperty({
    description: 'Описание направления подготовки',
    example: 'Frontend - это круто',
  })
  @Column({ allowNull: false })
  desc: string;

  @ApiProperty({ description: 'Связанные модели информации', type: [Info] })
  @HasMany(() => Info)
  infos: Info[];
  public getInfos!: HasManyGetAssociationsMixin<Info>;
  public addInfo!: HasManyAddAssociationMixin<CreateInfoDto, number>;
  public setInfos!: HasManySetAssociationsMixin<Info, number>;
  public removeInfo!: HasManyRemoveAssociationMixin<Info, number>;
  public createInfo!: HasManyCreateAssociationMixin<Info>;
  public countInfos!: HasManyCountAssociationsMixin;

  @ApiProperty({ description: 'Связанные модели пути', type: () => [Way] })
  @HasMany(() => Way)
  ways: Way[];
  public getWays!: HasManyGetAssociationsMixin<Way>;
  public addWay!: HasManyAddAssociationMixin<CreateWayDto, number>;
  public setWays!: HasManySetAssociationsMixin<Way, number>;
  public removeWay!: HasManyRemoveAssociationMixin<Way, number>;
  public createWay!: HasManyCreateAssociationMixin<Way>;
  public countWays!: HasManyCountAssociationsMixin;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  user: User;
}
