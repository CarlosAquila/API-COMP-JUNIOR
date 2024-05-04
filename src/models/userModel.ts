import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export class UserModel {
  async createUser(data: any) {
    return await prisma.user.create({data,});
  }
}