import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from './models/direction.model';
import { CreateDirectionDto } from './dto/createDirectionDto';
import { CreateWayDto } from './dto/createWayDto';
import { CreateInfoDto } from './dto/createInfoDto';
import { Way } from './models/way.model';
import { Info } from './models/info.model';

@Injectable()
export class DirectionService {
  constructor(
    @InjectModel(Direction)
    private readonly directionModel: typeof Direction,
    private readonly wayModel: typeof Way,
    private readonly infoModel: typeof Info,
  ) {}

  async getAll(): Promise<Direction[]> {
    return this.directionModel.findAll();
  }

  async createDirection(direction: CreateDirectionDto): Promise<Direction> {
    return this.directionModel.create(direction);
  }
  async createWay(dirId: number, way: CreateWayDto): Promise<Direction> {
    const directionObj = await this.directionModel.findOne({
      where: { id: dirId },
    });
    await directionObj.addWay(way);
    await directionObj.reload();
    return directionObj;
  }

  async createInfo(dirId: number, info: CreateInfoDto): Promise<Direction> {
    const directionObj = await this.directionModel.findOne({
      where: { id: dirId },
    });
    await directionObj.addInfo(info);
    await directionObj.reload();
    return directionObj;
  }

  async deleteDirection(dirId: number): Promise<number> {
    const dir = await this.directionModel.findOne({ where: { id: dirId } });
    await dir.destroy();
    return dirId;
  }
  async deleteWay(wayId: number): Promise<number> {
    const way = await this.wayModel.findOne({
      where: { id: wayId },
    });
    await way.destroy();
    return wayId;
  }

  async deleteInfo(infoId: number): Promise<number> {
    const info = await this.infoModel.findOne({
      where: { id: infoId },
    });
    await info.destroy();
    return infoId;
  }

  async getById(id: string): Promise<Direction> {
    return this.directionModel.findByPk(id);
  }
}
