import { ApiProperty } from '@nestjs/swagger';
import { MetaAnswerDto } from './metaAnswerDto';

export class CreateAnswerDto {
  @ApiProperty({
    example: 'это классный тел',
    description: 'Текст ответа',
  })
  text: string;

  @ApiProperty({
    example: 2,
    description: 'id критерия',
  })
  criteria: number;

  @ApiProperty({
    type: MetaAnswerDto,
    description: 'Метаданные ответа',
  })
  meta: MetaAnswerDto;
}
