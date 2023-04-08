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
    @InjectModel(Way)
    private readonly wayModel: typeof Way,
    @InjectModel(Info)
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
    const newWay = await this.wayModel.create(way);
    await directionObj.addWay(newWay.id);
    await directionObj.reload();
    return directionObj;
  }

  async createInfo(dirId: number, info: CreateInfoDto): Promise<Direction> {
    const directionObj = await this.directionModel.findOne({
      where: { id: dirId },
    });
    const newInfo = await this.infoModel.create(info);
    await directionObj.addInfo(newInfo.id);
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

  async getById(id: number): Promise<Direction> {
    return await this.directionModel.findByPk(id);
  }
}
