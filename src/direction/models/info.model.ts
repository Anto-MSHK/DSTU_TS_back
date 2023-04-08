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

  @ApiProperty({ description: 'название информации', example: 'Зарплата' })
  @Column({ allowNull: false })
  name: string;

  @ApiProperty({
    description: 'описание информации',
    example: 'ЗП реально бешенный, брат',
  })
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
