import { ApiProperty } from '@nestjs/swagger';

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
}
