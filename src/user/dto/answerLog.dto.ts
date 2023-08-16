import { ApiProperty } from '@nestjs/swagger';

export class AnswerLogDTO {
  @ApiProperty({ description: 'id вопроса', example: 1 })
  questionId: number;

  @ApiProperty({ description: 'массив id ответов', example: [3, 6] })
  answerIds: number[];
}
