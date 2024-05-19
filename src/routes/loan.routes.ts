import { Router } from "express";
import { LoanController } from "../controllers/loanController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";

const loanRoutes = Router();
const luanController = new LoanController();

loanRoutes.post("/", permissionMiddleware(["create loan"]), luanController.createLoan);

loanRoutes.use(permissionMiddleware(["read loan"]));

loanRoutes.get("/", luanController.getLoans);
loanRoutes.get("/:id", luanController.getLoanById);

loanRoutes.use(permissionMiddleware(["update loan"]));

loanRoutes.put("/update/:id", luanController.updateLoanById);
loanRoutes.put("/return/:id", luanController.returnLoanById);

loanRoutes.delete("/delete/:id", permissionMiddleware(["delete loan"]), luanController.deleteLoanById);


export { loanRoutes };