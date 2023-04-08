import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DirectionService } from './direction.service';
import { Direction } from './models/direction.model';

@ApiTags('directions')
@Controller('directions')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [Direction] })
  async getAll(): Promise<Direction[]> {
    return this.directionService.getAll();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: Direction })
  async create(@Body() direction: Direction): Promise<Direction> {
    return this.directionService.create(direction);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK', type: Direction })
  async getById(@Param('id') id: string): Promise<Direction> {
    return this.directionService.getById(id);
  }
}
