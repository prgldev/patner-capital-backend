import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/User';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  updateUser(user: User) {
    return this.userModel.updateOne(user.id, user);
  }

  createUser(user: User) {
    return this.userModel.create(user);
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  deleteUser(id: string) {
    return this.userModel.deleteOne({ id });
  }

  getAllUsers() {
    return this.userModel.find();
  }
}
