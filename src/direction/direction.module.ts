import { Module } from '@nestjs/common';
import { DirectionController } from './direction.controller';
import { DirectionService } from './direction.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Direction } from './models/direction.model';
import { Info } from './models/info.model';
import { Way } from './models/way.model';

@Module({
  controllers: [DirectionController],
  providers: [DirectionService],
  imports: [SequelizeModule.forFeature([Direction, Info, Way])],
})
export class DirectionModule {}
