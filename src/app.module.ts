import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './user/UsersModule';
import { AccessStrategy } from './strategy';
import { DirectionModule } from './direction/direction.module';
import { TestModule } from './test/test.module';
dotenv.config();
@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_database,
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    DirectionModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, AccessStrategy],
})
export class AppModule {}
