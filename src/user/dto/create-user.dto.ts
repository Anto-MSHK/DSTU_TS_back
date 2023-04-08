import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Max, Min } from 'sequelize-typescript';

export class CreateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя.' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя.' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({
    example: 'ivanov@example.com',
    description: 'Электронная почта пользователя.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя.' })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'Роль пользователя: user или admin.',
  })
  @IsEnum(['user', 'admin'])
  role: 'user' | 'admin';

  @ApiProperty({ example: 30, description: 'Возраст пользователя.' })
  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @ApiProperty({
    example: 'женат',
    description: 'Семейное положение пользователя.',
  })
  @IsString()
  maritalStatus: string;

  @ApiProperty({ example: 'мужской', description: 'Пол пользователя.' })
  @IsString()
  gender: string;
}
