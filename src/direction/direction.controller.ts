import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DirectionService } from './direction.service';
import { Direction } from './models/direction.model';
import { CreateDirectionDto } from './dto/createDirectionDto';
import { CreateWayDto } from './dto/createWayDto';
import { CreateInfoDto } from './dto/createInfoDto';
import { Roles } from 'src/user/role.decorator';
import { Role } from 'src/user/models/user.model';

@ApiTags('directions')
@Roles(Role.Admin)
@Controller('directions')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Get()
  @ApiOperation({
    summary: 'получить все направления подготовки',
  })
  @ApiResponse({ status: 200, description: 'OK', type: [Direction] })
  async getAll(): Promise<Direction[]> {
    return await this.directionService.getAll();
  }

  @Post('/add-dir')
  @ApiOperation({
    summary: 'создать напраление подготовки',
  })
  @ApiResponse({
    status: 201,
    type: Direction,
  })
  async create(
    @Body() direction: CreateDirectionDto,
    @Request() req,
  ): Promise<Direction> {
    return await this.directionService.createDirection(direction, req.user.id);
  }

  @Post('/:dirId/add-way')
  @ApiOperation({
    summary: 'создать путь в направлении',
  })
  @ApiResponse({
    status: 201,

    type: Direction,
  })
  async createWay(
    @Param('dirId') dirId: number,
    @Body() way: CreateWayDto,
  ): Promise<Direction> {
    return await this.directionService.createWay(+dirId, way);
  }

  @Post('/:dirId/add-info')
  @ApiOperation({
    summary: 'создать мини информацию в направлении подготовки (виджет)',
  })
  @ApiResponse({
    status: 201,
    type: Direction,
  })
  async createInfo(
    @Param('dirId') dirId: number,
    @Body() info: CreateInfoDto,
  ): Promise<Direction> {
    return await this.directionService.createInfo(+dirId, info);
  }

  @ApiOperation({
    summary: 'удалить напраление подготовки',
  })
  @Delete('/del-dir/:dirId')
  @ApiResponse({
    status: 201,
  })
  async delete(@Param('dirId') dirId: number): Promise<number> {
    return await this.directionService.deleteDirection(dirId);
  }

  @ApiOperation({
    summary: 'удалить путь в направлении',
  })
  @Delete('/del-way/:wayId')
  @ApiResponse({
    status: 201,
  })
  async deleteWay(@Param('wayId') wayId: number): Promise<number> {
    return await this.directionService.deleteWay(+wayId);
  }

  @ApiOperation({
    summary: 'удалить мини информацию в направлении подготовки (виджет)',
  })
  @Delete('/del-info/:infoId')
  @ApiResponse({
    status: 201,
  })
  async deleteInfo(@Param('infoId') infoId: number): Promise<number> {
    return await this.directionService.deleteInfo(+infoId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'получить направление подготовки по id',
  })
  @ApiResponse({ status: 200, description: 'OK', type: Direction })
  async getById(@Param('id') id: number): Promise<Direction> {
    return await this.directionService.getById(+id);
  }
}
