import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user';

export class ResponseDto {
  @ApiProperty({
    example: { id: 1, mail: 'foo@bar.bar', roles: ['ADMIN'] },
    description: 'user data',
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
