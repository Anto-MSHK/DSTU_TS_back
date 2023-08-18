import { ApiProperty } from '@nestjs/swagger';
import { Test } from 'src/test/models/test.model';
import { Results } from '../models/results.model';

export class AllResultsDTO {
  @ApiProperty({ description: 'информация о тесте' })
  testInfo: Test;

  @ApiProperty({ description: 'все результаты' })
  result: Results;
}
