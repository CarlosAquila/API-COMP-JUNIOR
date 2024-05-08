import { Router } from "express";
import { LoanController } from "../controllers/loanController";
const loanRoutes = Router();
const luanController = new LoanController();

loanRoutes.post("/", luanController.createLoan);
loanRoutes.get("/", luanController.getLoans);
loanRoutes.get("/:id", luanController.getLoanById);
loanRoutes.put("/update/:id", luanController.updateLoanById);
loanRoutes.put("/return/:id", luanController.returnLoanById);
loanRoutes.delete("/delete/:id", luanController.deleteLoanById);

export { loanRoutes };