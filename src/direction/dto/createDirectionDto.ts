import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user.model';

export class CreateDirectionDto {
  @ApiProperty({
    example: 'ios разработчик',
    description: 'user data',
  })
  title: string;

  @ApiProperty({
    example: 'описание',
    description: 'user data',
  })
  desc: string;
}
