import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user';
import { QuestionType } from '../models/question.model';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'Что такое ипхон?',
    description: 'Текст вопроса',
  })
  text: string;

  @ApiProperty({
    example: QuestionType.FILL,
    description: 'тип вопроса',
  })
  type: QuestionType;
}
