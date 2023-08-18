import { ApiProperty } from '@nestjs/swagger';
import { Criteria } from 'src/test/models/criteria.model';
import { Question } from 'src/test/models/question.model';
import { Answer } from 'src/test/models/answer.model';

export class CriteriaInfoDTO {
  @ApiProperty({ description: 'информация о критерии', type: [Criteria] })
  criteria: Criteria;

  @ApiProperty({ description: 'сумма результата', example: 12 })
  result: number;
}

export class LogsDTO {
  @ApiProperty({ description: 'вопрос', type: Question })
  question: Question;

  @ApiProperty({
    description:
      'Ответы. ВНИМАНИЕ: ответ (объект) пользователя имеет поле isAnswer',
    type: [Answer],
  })
  answers: Answer[];
}

export class ResultsByTestDTO {
  @ApiProperty({
    description: 'полная информация о критериях',
    type: [CriteriaInfoDTO],
  })
  criterias: CriteriaInfoDTO[];

  @ApiProperty({ description: 'полные логи о тесте', type: [LogsDTO] })
  logs: LogsDTO[];
}
