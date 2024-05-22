import { Request, Response } from "express";
import { LoanTypeService } from "../services/loanTypeService";
import LoanTypeDTO from "../dtos/loanTypeDTO";

const loanTypeService = new LoanTypeService();

export class LoanTypeController {

  async createLoanType(req: Request, res: Response) {
    try {
      const loanTypeData: LoanTypeDTO = new LoanTypeDTO(req.body);
      const newLoanType = await loanTypeService.createLoanType(loanTypeData);
      return res.status(201).json(newLoanType);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getLoanTypes(req: Request, res: Response) {
    try {
      const loanTypes = await loanTypeService.getLoanTypes();
      if (!loanTypes || (Array.isArray(loanTypes) && loanTypes.length === 0)) {
        return res.status(404).json({ error: "LoanTypes not found" });
      }
      return res.status(200).json(loanTypes);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getLoanTypeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const loanType = await loanTypeService.getLoanTypeById(id);
      if (!loanType) {
        return res.status(404).json({ error: "LoanType not found" });
      }
      return res.status(200).json(loanType);
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getLoanTypeByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const loanType = await loanTypeService.getLoanTypeByName(name);
      if (!loanType || (Array.isArray(loanType) && loanType.length === 0)) {
        return res.status(404).json({ error: "LoanType not found" });
      }
      return res.status(200).json(loanType);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateLoanTypeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const loanTypeData: LoanTypeDTO = new LoanTypeDTO(req.body);
      const updatedLoanType = await loanTypeService.updateLoanTypeById(id, loanTypeData);
      return res.status(200).json(updatedLoanType);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteLoanTypeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await loanTypeService.deleteLoanTypeById(id);
      return res.status(204).end();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

}