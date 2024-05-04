import { PrismaClient } from '@prisma/client';
import UserDTO from '../dtos/userDTO';
const prisma = new PrismaClient();


export class UserModel {
  async createUser(data: UserDTO) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address
      }

    });
  }
}