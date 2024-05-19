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
      const loan = await loanModel.getLoanById(id);
      if (!loan) {
        throw new Error("Loan not found");
      }

      const currentDate = new Date();
      const dueDate = loan.dueDate;
      let fine = 0;
      // to do valor do emprestimo vai variar de acordo com o tipo de livro
      
      if (currentDate > dueDate) {
        const diffTime = Math.abs(currentDate.getTime() - dueDate.getTime()); // in milliseconds
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // in days
        fine = diffDays * 0.5; // 50 cents per day
      }
      

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