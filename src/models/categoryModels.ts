import { PrismaClient, Prisma } from "@prisma/client";
import CategoryDTO from "../dtos/categoryDTO";
import e from "express";
const prisma = new PrismaClient();

export class CategoryModel {
  async createCategory(data: CategoryDTO) {
    try {
      return await prisma.category.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Category already exists");
        }
      }
      throw error;
    }
  }

  async getCategories() {
    try {
      return await prisma.category.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          name: "asc",
        },
        include: {
          books: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getCategoryById(id: string) {
    try {
      return await prisma.category.findUnique({
        where: {
          id,
          visible: true,
        },
        include: {
          books: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getCategoryByName(name: string) {
    try {
      return await prisma.category.findMany({
        where: {
          name : {
            contains: name,
          },
          visible: true,
        },
        include: {
          books: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateCategoryById(id: string, data: CategoryDTO) {
    try {
      return await prisma.category.update({
        where: {
          id,
          visible: true
        },
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Category already exists");
        }
        else if (error.code === "P2025") {
          throw new Error("Category not found");
        }
      }
      throw error;
    }
  }

  async deleteCategoryById(id: string) {
    try {
      return await prisma.category.update({
        where: {
          id,
        },
        data: {
          visible: false,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Category not found");
        }
      }
      throw error;
    }
  }
}