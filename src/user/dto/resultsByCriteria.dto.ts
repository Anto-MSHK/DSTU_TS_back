import { ApiProperty } from '@nestjs/swagger';

export class ResultsByCriteriaDTO {
  @ApiProperty({ description: 'id критерия', example: 1 })
  criteriaId: number;

  @ApiProperty({ description: 'результат критерия', example: 6 })
  result: number;
}
