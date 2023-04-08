import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  IsEmail,
  Max,
  Min,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import {
  DataTypes,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
} from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
import { Identity } from 'src/auth/models/Identity';

interface UserAttrs {
  email: string;
  password: string;
  role: 'user' | 'admin';
}

@Table
export class User extends Model<User, UserAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя.',
  })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя.' })
  @Column(DataType.STRING)
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя.' })
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
  @Min(0)
  @Max(150)
  @Column(DataType.INTEGER)
  age: number;

  @ApiProperty({
    example: 'женат',
    description: 'Семейное положение пользователя.',
  })
  @Column(DataType.STRING)
  maritalStatus: string;

  @ApiProperty({ example: 'мужской', description: 'Пол пользователя.' })
  @Column(DataType.STRING)
  gender: string;

  @HasOne(() => Identity)
  identity: Identity;
  public getIdentity!: HasOneGetAssociationMixin<Identity>;
  public setIdentity!: HasOneSetAssociationMixin<Identity, number>;
  public createIdentity!: HasOneCreateAssociationMixin<Identity>;
}
