import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user';
import { QuestionType } from '../models/question.model';

export class CreateAnswerDto {
  @ApiProperty({
    example: 'это классный тел',
    description: 'Текст ответа',
  })
  text: string;

  @ApiProperty({
    example: false,
    description: 'правильный или нет?',
  })
  isCorrect: boolean;
}
