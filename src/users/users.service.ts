import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateBulkUserDto } from './dto/update-bulk-user-dto';
import { QueryUserDto } from './dto/query-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { DeleteBulkUserDto } from './dto/delete-bulk-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create = async (createUserDto: CreateUserDto): Promise<User> => {
    try {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  findOne = async (id: string): Promise<User> => {
    try {
      const user = this.userModel.findById(id).select('-password');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  findAll = async ({
    offset,
    limit,
    username,
  }: QueryUserDto): Promise<User[]> => {
    try {
      let query = [
        {
          $match: {
            ...(username && {
              username: { $regex: username, $options: 'img' },
            }),
          },
        },
        offset && { $skip: offset },
        limit && { $limit: limit },
      ];
      query = query.filter((item) => item !== undefined);

      return this.userModel.aggregate(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  update = async (id: string, updateUserDto: UpdateUserDto): Promise<User> => {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  updateBulk = async ({
    ids,
    ...payload
  }: UpdateBulkUserDto): Promise<boolean> => {
    try {
      await this.userModel.updateMany({ _id: { $in: ids } }, payload);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  delete = async (id: DeleteUserDto): Promise<boolean> => {
    try {
      const user = this.userModel.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      this.userModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  deleteBulk = async (ids: DeleteBulkUserDto): Promise<boolean> => {
    try {
      this.userModel.deleteMany({ _id: { $in: ids } });
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
