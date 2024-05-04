
import UserDTO from '../dtos/userDTO';
import { UserModel } from '../models/userModel';
const userModel = new UserModel()

export class UserService {

  async createUser(data: UserDTO) {
    try {
      return userModel.createUser(data);
    } catch (error: unknown) {
      throw  error;
    }
  }
}