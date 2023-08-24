import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiProperty({
    example: 'Что такое ипхон?',
    description: 'Текст вопроса',
  })
  text: string;
}
