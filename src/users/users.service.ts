import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return this.toUserResponse(savedUser);
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find().lean();
    return users.map(this.toUserResponse);
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUserResponse(user);
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUserResponse(user);
  }

  async update(id: string, updateData: UpdateUserDto): Promise<IUser> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return this.toUserResponse(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
  }

  private toUserResponse(user: any): IUser {
    return {
      _id: user._id.toString(),
      fullName: user.fullName,
      password: user.password,
      email: user.email,
      createdAt: user.createdAt,
      isActive: user.isActive,
    };
  }
}
