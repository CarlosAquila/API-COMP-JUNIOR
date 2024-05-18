import { PrismaClient, Prisma } from "@prisma/client";
import RoleDTO from "../dtos/roleDTO";
const prisma = new PrismaClient();

export class RoleModel {
  async createRole(data: RoleDTO) {
    try {
      return await prisma.role.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Role already exists");
        }
      }
      throw error;
    }
  }

  async getRoles() {
    try {
      return await prisma.role.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          name: "asc",
        },
        include: {
          users: {},
          permissions: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getRoleById(id: string) {
    try {
      return await prisma.role.findUnique({
        where: {
          id,
          visible: true,
        },
        include: {
          users: {},
          permissions: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getRoleByName(name: string) {
    try {
      return await prisma.role.findMany({
        where: {
          name: {
            contains: name,
          },
          visible: true,
        },
        include: {
          users: {},
          permissions: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateRoleById(id: string, data: RoleDTO) {
    try {
      return await prisma.role.update({
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
          throw new Error("Role already exists");
        }
        else if (error.code === "P2025") {
          throw new Error("Role not found");
        }
      }
      throw error;
    }
  }

  async deleteRoleById(id: string) {
    try {
      return await prisma.role.update({
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
          throw new Error("Role not found");
        }
      }
      throw error;
    }
  }

  async addPermissionsToRole(id: string, permissionIds: string[]) {
    try {
      return await prisma.role.update({
        where: {
          id,
          visible: true,
        },
        data: {
          permissions: {
            connect: permissionIds.map(permissionIds => ({ id: permissionIds })),
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Role not found");
        }
        else if (error.code === "P2025") {
          throw new Error("Permission not found");
        }
      }
      throw error;
    }
  }

  async removePermissionsFromRole(id: string, permissionIds: string[]) {
    try {
      return await prisma.role.update({
        where: {
          id,
          visible: true,
        },
        data: {
          permissions: {
            disconnect: permissionIds.map(permissionIds => ({ id: permissionIds })),
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Role not found");
        }
        else if (error.code === "P2025") {
          throw new Error("Permission not found");
        }
      }
      throw error;
    }
  }

  async hasPermissions(roleId: string, permissionIds: string[]) {
    try {
      return await prisma.role.findFirst({
        where: {
          id: roleId,
          visible: true,
          permissions: {
            some: {
              id: {
                in: permissionIds.map(permissionIds => permissionIds),
              },
            },
          },
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }
}