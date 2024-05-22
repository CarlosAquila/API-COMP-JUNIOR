import { LoanTypeModel } from '../models/loanTypeModel';
import LoanTypeDTO from '../dtos/loanTypeDTO';
const loanTypeModel = new LoanTypeModel();

export class LoanTypeService {
  async createLoanType(data: LoanTypeDTO) {
    try {
      return loanTypeModel.createLoanType(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoanTypes() {
    try {
      return loanTypeModel.getLoanTypes();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoanTypeById(id: string) {
    try {
      return loanTypeModel.getLoanTypeById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getLoanTypeByName(name: string) {
    try {
      return loanTypeModel.getLoanTypeByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateLoanTypeById(id: string, data: LoanTypeDTO) {
    try {
      return loanTypeModel.updateLoanTypeById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteLoanTypeById(id: string) {
    try {
      return loanTypeModel.deleteLoanTypeById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}