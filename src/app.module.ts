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
import { RolesGuard } from './guards/roleGuard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/authGuard';
import { Test } from './test/models/test.model';
import { Question } from './test/models/question.model';
import { Answer } from './test/models/answer.model';
import { Results } from './user/models/results.model';
import { User } from './user/models/user.model';
import { Identity } from './auth/models/Identity';
import { Criteria } from './test/models/criteria.model';
import { Direction } from './direction/models/direction.model';
import { Info } from './direction/models/info.model';
import { Way } from './direction/models/way.model';

dotenv.config();
@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      protocol: 'postgres',
      host: process.env.DB_HOST,
      uri: process.env.DB_URL,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      models: [
        Test,
        Question,
        Answer,
        Results,
        User,
        Identity,
        Criteria,
        Direction,
        Info,
        Way,
      ],
      // dialectOptions: { ssl: true, native: true },
    }),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    DirectionModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AccessStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
