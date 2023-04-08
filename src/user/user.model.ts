import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
  AutoIncrement,
  AllowNull,
  IsEmail,
  Min,
  Max,
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя.',
  })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя.' })
  @AllowNull(false)
  @Column(DataType.STRING)
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя.' })
  @AllowNull(false)
  @Column(DataType.STRING)
  lastName: string;

  @ApiProperty({
    example: 'ivanov@example.com',
    description: 'Электронная почта пользователя.',
  })
  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя.' })
  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'Роль пользователя: user или admin.',
  })
  @AllowNull(false)
  @Column(DataType.ENUM('user', 'admin'))
  role: 'user' | 'admin';

  @ApiProperty({ example: 30, description: 'Возраст пользователя.' })
  @AllowNull(false)
  @Min(0)
  @Max(150)
  @Column(DataType.INTEGER)
  age: number;

  @ApiProperty({
    example: 'женат',
    description: 'Семейное положение пользователя.',
  })
  @AllowNull(false)
  @Column(DataType.STRING)
  maritalStatus: string;

  @ApiProperty({ example: 'мужской', description: 'Пол пользователя.' })
  @AllowNull(false)
  @Column(DataType.STRING)
  gender: string;
}
