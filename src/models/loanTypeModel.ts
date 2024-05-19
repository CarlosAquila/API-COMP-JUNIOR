import { Prisma, PrismaClient } from "@prisma/client";
import LoanTypeDTO from "../dtos/loanTypeDTO";
const prisma = new PrismaClient();

export class LoanTypeModel {
  async createLoanType(data: LoanTypeDTO) {
    try {
      return await prisma.loanType.create({
        data: {
          name: data.name,
          fine: data.fine,
          day: data.day,
          description: data.description,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("LoanType already exists");
        }
      }
      throw error;
    }
  }

  async getLoanTypes() {
    try {
      return await prisma.loanType.findMany({
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

  async getLoanTypeById(id: string) {
    try {
      return await prisma.loanType.findUnique({
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

  async getLoanTypeByName(name: string) {
    try {
      return await prisma.loanType.findMany({
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

  async updateLoanTypeById(id: string, data: LoanTypeDTO) {
    try {
      return await prisma.loanType.update({
        where: {
          id,
          visible: true,
        },
        data: {
          name: data.name,
          fine: data.fine,
          day: data.day,
          description: data.description,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("name")) {
          throw new Error("LoanType already exists");
        }
        if (error.code === "P2025") {
          throw new Error("LoanType not found");
        }
      }
      throw error;
    }
  }

  async deleteLoanTypeById(id: string) {
    try {
      return await prisma.loanType.update({
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
          throw new Error("LoanType not found");
        }
      }
      throw error;
    }
  }
}
