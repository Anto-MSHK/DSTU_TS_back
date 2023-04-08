import { Injectable } from '@nestjs/common';
import { Test } from './models/test.model';

@Injectable()
export class TestsService {
  async create(name: string): Promise<Test> {
    return Test.create({ name });
  }

  async findAll(): Promise<Test[]> {
    return Test.findAll();
  }

  async findOne(id: number): Promise<Test> {
    return Test.findOne({ where: { id } });
  }

  async update(id: number, name: string): Promise<Test> {
    const test = await Test.findOne({ where: { id } });
    test.name = name;
    await test.save();
    return test;
  }

  async remove(id: number): Promise<void> {
    const test = await Test.findOne({ where: { id } });
    await test.destroy();
  }
}
