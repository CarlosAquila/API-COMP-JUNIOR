import { PrismaClient, Prisma } from "@prisma/client";
import PublisherDTO from "../dtos/publisherDTO";
const prisma = new PrismaClient();

export class PublisherModel {
  async createPublisher(data: PublisherDTO) {
    try {
      return await prisma.publisher.create({
        data: {
          name: data.name,
          address: data.address,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Publisher already exists");
        }
      }
      throw error;
    }
  }

  async getPublishers() {
    try {
      return await prisma.publisher.findMany({
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

  async getPublisherById(id: string) {
    try {
      return await prisma.publisher.findUnique({
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

  async getPublisherByName(name: string) {
    try {
      return await prisma.publisher.findMany({
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

  async updatePublisherById(id: string, data: PublisherDTO) {
    try {
      return await prisma.publisher.update({
        where: {
          id,
          visible: true,
        },
        data: {
          name: data.name,
          address: data.address,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Publisher not found");
        }
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("Publisher already exists");
        }
      }
      throw error;
    }
  }

  async deletePublisherById(id: string) {
    try {
      return await prisma.publisher.update({
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
          throw new Error("Publisher not found");
        }
      }
      throw error;
    }
  }
}