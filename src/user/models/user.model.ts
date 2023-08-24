import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
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
import { ApiProperty } from '@nestjs/swagger';
import { Identity } from 'src/auth/models/Identity';
import { Results } from './results.model';
import { ResultsByCriteriaDTO } from '../dto/resultsByCriteria.dto';
import { Direction } from 'src/direction/models/direction.model';
import { CreateDirectionDto } from 'src/direction/dto/createDirectionDto';
import { News } from 'src/news/news.model';
import { CreateNewsDto } from 'src/news/dto/CreateNewsDto';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

interface UserAttrs {
  email: string;
  password: string;
  role: Role;
}

@Table({
  defaultScope: {
    include: [
      { model: Direction, as: 'directions' },
      { model: Results, as: 'results' },
    ],
  },
})
export class User extends Model<User, UserAttrs> {
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

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя.' })
  @Column(DataType.STRING)
  patronymic: string;

  @ApiProperty({ example: 30, description: 'Возраст пользователя.' })
  @Min(0)
  @Max(150)
  @Column(DataType.INTEGER)
  age: number;

  @ApiProperty({
    example: 'ivanov@example.com',
    description: 'Электронная почта пользователя.',
  })
  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  email: string;

  @ApiProperty({
    example: '89234357891',
    description: 'Телефон пользователя.',
  })
  @Unique
  @Column(DataType.STRING)
  phoneNumber: string;

  @ApiProperty({
    example: 'г. Азов',
    description: 'Название населённого пункта пользователя',
  })
  @Column(DataType.STRING)
  locality: string;

  @ApiProperty({
    example: 'МБОУ СОШ №3',
    description: 'Название школы.',
  })
  @Column(DataType.STRING)
  schoolName: string;

  @ApiProperty({
    example: '11-г',
    description: 'Название класса.',
  })
  @Column(DataType.STRING)
  schoolClass: string;

  @ApiProperty({
    example: 'женат',
    description: 'Семейное положение пользователя.',
  })
  @Column(DataType.STRING)
  maritalStatus: string;

  @ApiProperty({ example: 'мужской', description: 'Пол пользователя.' })
  @Column(DataType.STRING)
  gender: string;

  @ApiProperty({
    example: 'user',
    description: 'Роль пользователя: user или admin.',
  })
  @AllowNull(false)
  @Column(DataType.ENUM('user', 'admin'))
  role: Role;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя.' })
  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @HasMany(() => Results)
  results: Results[];
  public getResults!: HasManyGetAssociationsMixin<Results>;
  public addResult!: HasManyAddAssociationMixin<ResultsByCriteriaDTO, number>;
  public setResults!: HasManySetAssociationsMixin<Results, number>;
  public removeResult!: HasManyRemoveAssociationMixin<Results, number>;
  public createResult!: HasManyCreateAssociationMixin<Results>;
  public countResults!: HasManyCountAssociationsMixin;

  @HasMany(() => Direction)
  directions: Direction[];
  public getDirections!: HasManyGetAssociationsMixin<Direction>;
  public addDirection!: HasManyAddAssociationMixin<CreateDirectionDto, number>;
  public setDirections!: HasManySetAssociationsMixin<Direction, number>;
  public removeDirection!: HasManyRemoveAssociationMixin<Direction, number>;
  public createDirection!: HasManyCreateAssociationMixin<Direction>;
  public countDirections!: HasManyCountAssociationsMixin;

  @HasMany(() => News)
  news: News[];
  public getNewss!: HasManyGetAssociationsMixin<News>;
  public addNews!: HasManyAddAssociationMixin<CreateNewsDto, number>;
  public setNewss!: HasManySetAssociationsMixin<News, number>;
  public removeNews!: HasManyRemoveAssociationMixin<News, number>;
  public createNews!: HasManyCreateAssociationMixin<News>;
  public countNewss!: HasManyCountAssociationsMixin;

  @HasOne(() => Identity)
  identity: Identity;
  public getIdentity!: HasOneGetAssociationMixin<Identity>;
  public setIdentity!: HasOneSetAssociationMixin<Identity, number>;
  public createIdentity!: HasOneCreateAssociationMixin<Identity>;
}
