import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async getUsers() {
    return await this.userRepo.findAll();
  }

  async getUserById(id: number) {
    return await this.userRepo.findOne({ where: { id } });
  }

  async create(DTO: CreateUserDTO) {
    const email = DTO.email;
    const password = await bcrypt.hash(DTO.password, 2);

    const user = await this.userRepo.create({ email, password });

    return user;
  }

  async findByMail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async updateUser(id: number, data: User) {
    const user = await this.userRepo.findOne({ where: { id } });
    await user.update({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      maritalStatus: data.maritalStatus,
      gender: data.gender,
    });
    await user.reload();
    return user;
  }
}
