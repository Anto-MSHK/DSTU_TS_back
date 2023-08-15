import { ApiProperty } from '@nestjs/swagger';

export class CreateCriteriaDto {
  @ApiProperty({
    example: 'человек-техника',
    description: 'название критерия',
  })
  name: string;
}
