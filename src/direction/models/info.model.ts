import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Direction } from './direction.model';

@Table
export class Info extends Model<Info> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ description: 'Название информации' })
  @Column({ allowNull: false })
  name: string;

  @ApiProperty({ description: 'Описание информации' })
  @Column({ allowNull: false })
  value: string;

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
