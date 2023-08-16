import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.model';

interface Attrs {
  userId: number;
  refreshHash: string;
}

@Table
export class Identity extends Model<Identity, Attrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.INTEGER })
  id: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  refreshHash: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  static verifyToken(token: string) {
    const jwtService = new JwtService();
    const user = jwtService.verify(token.split(' ')[1], {
      secret: process.env.A_KEY,
    });
    return user;
  }
}
