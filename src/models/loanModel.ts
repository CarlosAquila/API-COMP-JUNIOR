import { PrismaClient, Prisma, Loan, Book } from "@prisma/client";
import LoanDTO from "../dtos/loanDTO";
const prisma = new PrismaClient();

export class LoanModel {

  async createLoan(data: LoanDTO) {
    try {
      return await prisma.loan.create({
        data: {
          bookId: data.bookId,
          userId: data.userId,
          employeeId: data.employeeId,
          returnDate: data.returnDate,
          condition: data.condition,
          paymethod: data.paymethod,
          dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    } catch (error: unknown) {
     
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new Error("Not found");
        }
       
      }
      throw error;
    }
  }

  async getLoans() {
    try {
      return await prisma.loan.findMany({
        where: {
          visible: true,
        },
        include: {
          book: {},
          user: {},
          employee: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoanById(id: string) {
    try {
      return await prisma.loan.findUnique({
        where: {
          id,
          visible: true,
        },
        include: {
          book: {},
          user: {},
          employee: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoanWithBookLoanTypeById(id: string): Promise<Loan & { book: Book & { loanType: { fine: number; day: number } } }| null> {
    try {
      return await prisma.loan.findUnique({
        where: {
          id,
          visible: true,
        },
        include: {
          book: {include: {loanType: {
            //seleciona tudo do loantype
            select: {
              fine: true,
              day: true,
            }
          }}},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoanTypeByBookId(bookId: string) {
    try {
      return await prisma.loan.findFirst({
        where: {
          bookId,
          visible: true,
        },
        include: {
          book: {},
          user: {},
          employee: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateLoanById(id: string, data: LoanDTO) {
    try {
      return await prisma.loan.update({
        where: {
          id,
          visible: true,
        },
        data: {
          bookId: data.bookId,
          userId: data.userId,
          employeeId: data.employeeId,
          returnDate: data.returnDate,
          condition: data.condition,
          paymethod: data.paymethod,
          fees: data.fees,
        },
        include: {
          book: {},
          user: {},
          employee: {},
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Loan not found");
        }
        if (error.code === "P2003") {
          throw new Error("Not found");
        }
      }
      throw error;
    }
  }

  async returnLoanById(id: string, returnDate: Date, fees: number) {
    try {
      return await prisma.loan.update({
        where: {
          id,
          visible: true,
        },
        data: {
          returnDate,
          fees,
          returned: true,
        },
        include: {
          book: {},
          user: {},
          employee: {},
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Loan not found");
        }
      }
      throw error;
    }
  }

  async deleteLoanById(id: string) {
    try {
      return await prisma.loan.update({
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
          throw new Error("Loan not found");
        }
      }
      throw error;
    }
  }


}