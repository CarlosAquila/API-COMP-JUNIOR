import { PrismaClient, Prisma } from '@prisma/client';
import UserDTO from '../dtos/userDTO';
const prisma = new PrismaClient();


export class UserModel {
  
  async createUser(data: UserDTO) {
    try {
      return await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address
        }
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta && typeof error.meta.target === 'string' && error.meta.target.includes('email')) {
          throw new Error("Email already exists");
        }
      }
      throw error;
    }
  }

  async getUsers() {
    try {
      return await prisma.user.findMany({
        where: {
          visible: true
        },
        orderBy: {
          email: 'asc'
        },
        include: {
          loans: {}
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      return await prisma.user.findUnique({
        where: {
          id,
          visible: true
        },
        include: {
          loans: {}
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  }



}