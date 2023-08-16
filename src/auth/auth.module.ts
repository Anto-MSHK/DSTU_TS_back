import { SequelizeModule } from '@nestjs/sequelize';
import { Identity } from './models/Identity';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.model';
import { UsersModule } from 'src/user/UsersModule';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.A_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    SequelizeModule.forFeature([Identity, User]),
    UsersModule,
  ],
})
export class AuthModule {}
