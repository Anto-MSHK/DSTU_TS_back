import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from './models/direction.model';

@Injectable()
export class DirectionService {
  constructor(
    @InjectModel(Direction)
    private readonly directionModel: typeof Direction,
  ) {}

  async getAll(): Promise<Direction[]> {
    return this.directionModel.findAll();
  }

  async create(direction: Direction): Promise<Direction> {
    return this.directionModel.create(direction);
  }

  async getById(id: string): Promise<Direction> {
    return this.directionModel.findByPk(id);
  }
}
