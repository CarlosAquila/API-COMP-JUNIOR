import { PrismaClient, Prisma } from "@prisma/client";
import PermissionDTO from "../dtos/permissionDTO";
const prisma = new PrismaClient();

export class PermissionModel {
  async createPermission(data: PermissionDTO) {
    try {
      return await prisma.permission.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Permission already exists");
        }
      }
      throw error;
    }
  }

  async getPermissions() {
    try {
      return await prisma.permission.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          name: "asc",
        },
        include: {
          users: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPermissionById(id: string) {
    try {
      return await prisma.permission.findUnique({
        where: {
          id,
          visible: true,
        },
        include: {
          users: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPermissionByName(name: string) {
    try {
      return await prisma.permission.findMany({
        where: {
          name: {
            contains: name,
          },
          visible: true,
        },
        include: {
          users: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updatePermissionById(id: string, data: PermissionDTO) {
    try {
      return await prisma.permission.update({
        where: {
          id,
          visible: true,
        },
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Permission already exists");
        }
        else if (error.code === "P2025") {
          throw new Error("Permission not found");
        }
      }
      throw error;
    }
  }

  async deletePermissionById(id: string) {
    try {
      return await prisma.permission.update({
        where: {
          id,
          visible: true,
        },
        data: {
          visible: false,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Permission not found");
        }
      }
      throw error;
    }
  }
}