import { Request, Response } from "express";
import { LoanService } from "../services/loanService";
import LoanDTO from "../dtos/loanDTO";

const loanService = new LoanService();

export class LoanController {

  async createLoan(req: Request, res: Response) {
    try {
      const loanData: LoanDTO = new LoanDTO(req.body);
      const newLoan = await loanService.createLoan(loanData);
      return res.status(201).json(newLoan);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getLoans(req: Request, res: Response) {
    try {
      const loans = await loanService.getLoans();
      if (!loans || (Array.isArray(loans) && loans.length === 0)) {
        return res.status(404).json({ error: "Loans not found" });
      }
      return res.status(200).json(loans);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getLoanById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const loan = await loanService.getLoanById(id);
      if (!loan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      return res.status(200).json(loan);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateLoanById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const loanData: LoanDTO = new LoanDTO(req.body);
      const updatedLoan = await loanService.updateLoanById(id, loanData);
      if (!updatedLoan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      return res.status(200).json(updatedLoan);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async returnLoanById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const returnedLoan = await loanService.returnLoanById(id);
      if (!returnedLoan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      return res.status(200).json(returnedLoan);
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteLoanById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await loanService.deleteLoanById(id);
      return res.status(204).end();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}