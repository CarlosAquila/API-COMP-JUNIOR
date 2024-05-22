import { LoanModel } from '../models/loanModel';
import LoanDTO from '../dtos/loanDTO';
const loanModel = new LoanModel();

export class LoanService {
  async createLoan(data: LoanDTO) {
    try {
      return loanModel.createLoan(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoans() {
    try {
      return loanModel.getLoans();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoanById(id: string) {
    try {
      return loanModel.getLoanById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateLoanById(id: string, data: LoanDTO) {
    try {
      return loanModel.updateLoanById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async returnLoanById(id: string) {
    try {
      const loanWithBook = await loanModel.getLoanWithBookLoanTypeById(id);
      if (!loanWithBook) {
        throw new Error("Loan not found");
      }
      //verifica se ja foi devolvido
      if (loanWithBook.returnDate) {
        throw new Error("Loan already returned");
      }
      // Verifica o livro do emprestimo
      const book = loanWithBook.book;
      if (!book) {
        throw new Error("Book not found");
      }

      const currentDate = new Date();
      const dueDate = loanWithBook.dueDate;
      let fine = 0;

      //pega o tipo de emprestimo do livro
      const fee = book.loanType.fine;

      // Verifica se esta atrasado
      if (currentDate > dueDate) {
        const diffTime = Math.abs(currentDate.getTime() - dueDate.getTime()); // in milliseconds
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // in days
        fine = diffDays * fee; // 50 cents per day
      }

      //todo: implementar pagamento
      
      

      return loanModel.returnLoanById(id, currentDate, fine );
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteLoanById(id: string) {
    try {
      return loanModel.deleteLoanById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}