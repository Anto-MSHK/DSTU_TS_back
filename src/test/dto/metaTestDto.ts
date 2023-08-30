import { ApiProperty } from '@nestjs/swagger';

export class DecryptGroupsDto {
  @ApiProperty({
    example: '2',
    description: 'номер группы ответа',
    required: false,
  })
  name: '1';

  @ApiProperty({
    example: 'Настойчивость',
    description: 'расшифровка группы ответа',
    required: false,
  })
  text: 'Настойчивость';
}

export class MetaTestDto {
  @ApiProperty({
    type: [DecryptGroupsDto],
    description: 'Расшифровка групп',
    required: false,
  })
  decryptGroups?: DecryptGroupsDto[];
}
