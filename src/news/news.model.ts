import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user.model';
import { CreateNewsDto } from './dto/CreateNewsDto';

@Table
export class News extends Model<News, CreateNewsDto> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'название новости',
    example: 'Раздача плюшек сегодня!',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    description: 'текст новости',
    example: 'Всякие бла бла бла бла бла бла бла бла бла бла бла бла',
  })
  @Column({
    type: DataType.TEXT,
  })
  text: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
