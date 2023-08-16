import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../user/UsersService';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Identity } from './models/Identity';
import { Role, User } from '../user/models/user.model';
import { CreateUserDTO } from '../user/dto/createUser.dto';
import * as uuid from 'uuid';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Identity) private identRepo: typeof Identity,
    @InjectModel(User) private userRepo: typeof User,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDTO) {
    const curUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (curUser)
      throw new HttpException(
        'Пользователь уже существует!',
        HttpStatus.BAD_REQUEST,
      );
    const password = await bcrypt.hash(dto.password, 2);
    const user = await this.userRepo.create({
      ...dto,
      password,
      role: Role.User,
    });

    const tokens = await this.generateTokens({
      id: user.id,
      role: user.role,
    });
    const refreshHash = await bcrypt.hash(tokens.refreshToken, 3);
    await this.identRepo.create({ userId: user.id, refreshHash });
    delete user.dataValues.password;
    return { tokens, user };
  }

  async login(dto: CreateUserDTO) {
    const user = await this.usersService.findByMail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens({
      id: user.id,
      role: user.role,
    });
    const refreshHash = await bcrypt.hash(tokens.refreshToken, 3);
    await this.identRepo.update(
      { refreshHash },
      { where: { userId: user.id } },
    );
    delete user.dataValues.password;

    return { tokens, user };
  }

  async generateTokens(
    payload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.A_KEY,
      expiresIn: '14d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.R_KEY,
      expiresIn: '14d',
    });
    return { accessToken, refreshToken };
  }

  async validateUser(mail: string, pass: string): Promise<any> {
    const user = await this.usersService.findByMail(mail);
    if (!user || !bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    delete user.dataValues.password;
    return user;
  }

  async refresh(user: User) {
    const userDb = await this.usersService.findByMail(user.email);
    const tokens = await this.generateTokens({
      id: userDb.id,
      role: userDb.role,
    });
    const refreshHash = await bcrypt.hash(tokens.refreshToken, 3);
    await this.identRepo.update(
      { refreshHash },
      { where: { userId: user.id } },
    );
    delete userDb.dataValues.password;
    return { tokens, user: userDb };
  }

  async logout(refreshToken) {
    const refreshHash = await bcrypt.hash(refreshToken, 3);
    return await this.identRepo.destroy({ where: { refreshHash } });
  }
}
