
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

  async getUsers() {
    try {
      return userModel.getUsers();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      return userModel.getUserById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return userModel.getUserByEmail(email);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateUserById(id: string, data: UserDTO) {
    try {
      return userModel.updateUserById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteUserById(id: string) {
    try {
      return userModel.deleteUserById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async comparePassword(password: string, hash: string) {
    try {
      return userModel.comparePassword(password, hash);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateUserPassword(id: string, password: string) {
    try {
      return userModel.updateUserPassword(id, password);
    } catch (error: unknown) {
      throw error;
    }
  }

  async addRoleToUser(userId: string, rolesId: string[]) {
    try {
      return userModel.addRoleToUser(userId, rolesId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async removeRoleFromUser(userId: string, roleId: string[]) {
    try {
      return userModel.removeRoleFromUser(userId, roleId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async hasRole(userId: string, roleId: string[]) {
    try {
      return userModel.hasRole(userId, roleId);
    } catch (error: unknown) {
      throw error;
    }
  }

}