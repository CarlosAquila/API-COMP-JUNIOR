import { PrismaClient, Prisma } from "@prisma/client";
import BookDTO from "../dtos/bookDTO";
const prisma = new PrismaClient();

export class BookModel {
  async createBook(data: BookDTO) {
    try {
      return await prisma.book.create({
        data: {
          title: data.title,
          description: data.description,
          isbn: data.isbn,
          year: data.year,
          publisherId: data.publisherId,
          //vinculação implicita dos autores ao livro
          authors: {
            connect: data.authors.map(authorId => ({ id: authorId })),
          },
          categories: {
            connect: data.categories.map(categoriesId => ({ id: categoriesId })),
          },
          loanTypeId: data.loanTypeId,
        },
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("isbn")) {
          throw new Error("Book already exists");
        }
        else if (error.code === "P2003") {
          throw new Error("Publisher not found");
        }
        else if (error.code === "P2025") {
          throw new Error("One or more authors or categories not found");
        }
      }
      throw error;
    }
  }

  async getBooks() {
    try {
      return await prisma.book.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          title: "asc",
        },
        include: {
          publisher: {},
          authors: {},
          categories: {},
          loans: {},
        },
      });
    }
    catch (error: unknown) {
      throw error;
    }
  }

  async getBookById(id: string) {
    try {
      return await prisma.book.findUnique({
        where: {
          id,
          visible: true,
        },
        include: {
          publisher: {},
          authors: {},
          categories: {},
          loans: {},
        },
      });
    }
    catch (error: unknown) {
      throw error;
    }
  }

  async getBookByTitle(title: string) {
    try {
      return await prisma.book.findMany({
        where: {
          title: {
            contains: title,
          },
          visible: true,
        },
        include: {
          publisher: {},
          authors: {},
          categories: {},
          loans: {},
        },
      });
    }
    catch (error: unknown) {
      throw error;
    }
  }

  async getBooksByPublisher(publisherId: string) {
    try {
      return await prisma.book.findMany({
        where: {
          publisherId,
          visible: true,
        },
        include: {
          publisher: {},
          authors: {},
          categories: {},
          loans: {},
        },
      });
    }
    catch (error: unknown) {
      throw error;
    }
  }

  async getBooksByAuthor(authorId: string) {
    try {
      return await prisma.book.findMany({
        where: {
          authors: {
            some: {
              id: authorId,
            },
          },
          visible: true,
        },
        include: {
          publisher: {},
          authors: {},
          categories: {},
          loans: {},
        },
      });
    }
    catch (error: unknown) {
      throw error;
    }
  }

  async updateBookById(id: string, data: BookDTO) {
    try {
      return await prisma.book.update({
        where: {
          id,
          visible: true,
        },
        data: {
          title: data.title,
          description: data.description,
          isbn: data.isbn,
          year: data.year,
          publisherId: data.publisherId,
          //vinculação implicita dos autores ao livro
          authors: {
            connect: data.authors.map(authorId => ({ id: authorId })),
          },
          categories: {
            connect: data.categories.map(categoriesId => ({ id: categoriesId })),
          },
        },
      });
    }
    catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.meta);
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("isbn")) {
          throw new Error("Book already exists");
        }
        else if (error.code === "P2003") {
          throw new Error("Publisher not found");
        }
        else if (error.code === "P2016") {
          throw new Error("Book not found");
        }
        else if (error.code === "P2025" ) {
          throw new Error("One or more authors or categories not found");
        }
      }
      throw error;
    }
  }

  async deleteBookById(id: string) {
    try {
      return await prisma.book.update({
        where: {
          id,
          visible: true,
        },
        data: {
          visible: false,
        },
      });
    }
    catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Book not found");
        }
      }
      throw error;
    }
  }

}
  