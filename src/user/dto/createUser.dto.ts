import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'mail@mail.io' })
  email: string;

  @ApiProperty({ example: '123456789876' })
  password: string;
}
