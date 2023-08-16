import { ApiProperty } from '@nestjs/swagger';

export class ResultsByCriteriaDTO {
  @ApiProperty({ description: 'id критерия', example: 1 })
  criteriaId: string;

  @ApiProperty({ description: 'результат критерия', example: 6 })
  result: string;
}
