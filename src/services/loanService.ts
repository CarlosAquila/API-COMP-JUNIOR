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
      return loanModel.returnLoanById(id);
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