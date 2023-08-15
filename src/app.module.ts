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
      protocol: 'postgres',
      host: process.env.DB_HOST,
      uri: process.env.DB_URL,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: { ssl: true, native: true }, //removed ssl
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
