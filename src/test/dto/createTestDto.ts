import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
  @ApiProperty({
    example: 'Ты ios чел оси?',
    description: 'название теста',
  })
  name: string;

  @ApiProperty({
    example: 'ios разработчик',
    description: 'описание теста',
  })
  desc: string;
}
