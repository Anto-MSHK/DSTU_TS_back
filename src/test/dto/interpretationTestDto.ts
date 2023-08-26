import { ApiProperty } from '@nestjs/swagger';

export class InterpretationTestDto {
  @ApiProperty({
    example: ['-', '30'],
    description:
      'Значение интерпритации: ["-","<число>"] - до числа; ["<число>","<число>"] - от числа и до числа; ["<число>","-"] - после числа;',
  })
  value: string[];

  @ApiProperty({
    example: 'умеренный уровнень',
    description: 'Интерпритация',
  })
  text: string;
}
