import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user';

export class ResponseDto {
  @ApiProperty({
    description: 'Данные о пользователе',
    type: User,
  })
  user: User;

  @ApiProperty({
    example: {
      refreshToken: 'ficskcshkfh(^ENIGCUefhs',
      accessToken: 'ficskcshkfh(^ENIGCUefhs',
    },
    description: 'tokens',
  })
  tokens: {
    refreshToken: string;
    accessToken: string;
  };

  constructor(user, tokens) {
    this.user = user;
    this.tokens = tokens;
  }
}
