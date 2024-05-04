
import { UserModel } from '../models/userModel';
const userModel = new UserModel()

export class UserService {
  async createUser(data: any) {
    return userModel.createUser(data);
  }
}