import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    example: 'Супер тушканчики в парке!!!',
    description: 'Заголовок новости',
  })
  title: string;

  @ApiProperty({
    example: 'Очень интересно',
    description: 'Текст новости',
  })
  text: string;

  userId?: number;
}
