import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DirectionService } from './direction.service';
import { Direction } from './models/direction.model';
import { CreateDirectionDto } from './dto/createDirectionDto';
import { CreateWayDto } from './dto/createWayDto';
import { CreateInfoDto } from './dto/createInfoDto';
import { Way } from './models/way.model';
import { Info } from './models/info.model';

@ApiTags('directions')
@Controller('directions')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [Direction] })
  async getAll(): Promise<Direction[]> {
    return await this.directionService.getAll();
  }

  @Post('/add-dir')
  @ApiResponse({
    status: 201,
    description: 'создать напраление подготовки',
    type: Direction,
  })
  async create(@Body() direction: CreateDirectionDto): Promise<Direction> {
    return await this.directionService.createDirection(direction);
  }

  @Post('/:dirId/add-way')
  @ApiResponse({
    status: 201,
    description: 'создать путь в направлении',
    type: Direction,
  })
  async createWay(
    @Param('dirId') dirId: number,
    @Body() way: CreateWayDto,
  ): Promise<Direction> {
    return await this.directionService.createWay(dirId, way);
  }

  @Post('/:dirId/add-info')
  @ApiResponse({
    status: 201,
    description: 'создать мини информацию в направлении подготовки (виджет)',
    type: Direction,
  })
  async createInfo(
    @Param('dirId') dirId: number,
    @Body() info: CreateInfoDto,
  ): Promise<Direction> {
    return await this.directionService.createInfo(dirId, info);
  }

  @Delete('/del-dir/:dirId')
  @ApiResponse({
    status: 201,
    description: 'удалить напраление подготовки',
    type: Direction,
  })
  async delete(@Param('dirId') dirId: number): Promise<number> {
    return await this.directionService.deleteDirection(dirId);
  }

  @Delete('/del-way/:wayId')
  @ApiResponse({
    status: 201,
    description: 'удалить путь в направлении',
    type: Direction,
  })
  async deleteWay(@Param('wayId') wayId: number): Promise<number> {
    return await this.directionService.deleteWay(wayId);
  }

  @Delete('/del-info/:infoId')
  @ApiResponse({
    status: 201,
    description: 'удалить мини информацию в направлении подготовки (виджет)',
    type: Direction,
  })
  async deleteInfo(@Param('infoId') infoId: number): Promise<number> {
    return await this.directionService.deleteInfo(infoId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK', type: Direction })
  async getById(@Param('id') id: string): Promise<Direction> {
    return await this.directionService.getById(id);
  }
}
