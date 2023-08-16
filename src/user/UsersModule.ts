import { Module } from '@nestjs/common';
import { UsersService } from './UsersService';
import { UsersController } from './UsersController';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Results } from './models/results.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
  imports: [SequelizeModule.forFeature([User, Results])],
})
export class UsersModule {}
