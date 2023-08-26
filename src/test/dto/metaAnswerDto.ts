import { ApiProperty } from '@nestjs/swagger';

export class MetaAnswerDto {
  @ApiProperty({
    example: 2,
    description: 'Вес ответа',
    required: false,
  })
  weight?: number;

  @ApiProperty({
    example: '1',
    description: 'Группа к которой принадлежит ответ',
    required: false,
  })
  group?: string;
}
