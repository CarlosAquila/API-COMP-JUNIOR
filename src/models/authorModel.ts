import { PrismaClient, Author, Prisma } from "@prisma/client";
import AuthorDTO from "../dtos/authorDTO";
const prisma = new PrismaClient();

export class AuthorModel {
  async createAuthor(data: AuthorDTO) {
    try {
      return await prisma.author.create({
        data: {
          name: data.name,
          biography: data.biography,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Author already exists");
        }
      }
      throw error;
    }
  }

  async getAuthors() {
    try {
      return await prisma.author.findMany({
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

  async getAuthorById(id: string) {
    try {
      return await prisma.author.findUnique({
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

  async getAuthorByName(name: string) {
    try {
      return await prisma.author.findMany({
        where: {
          name: {
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

  async updateAuthorById(id: string, data: AuthorDTO) {
    try {
      return await prisma.author.update({
        where: {
          id,
          visible: true
        },
        data: {
          name: data.name,
          biography: data.biography,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Author already exists");
        }
        else if (error.code === "P2025") {
          throw new Error("Author not found");
        }
      }
      throw error;
    }
  }

  async deleteAuthorById(id: string) {
    try {
      return await prisma.author.update({
        where: {
          id,
          visible: true
        },
        data: {
          visible: false,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Author not found");
        }
      }
      throw error;
    }
  }

}