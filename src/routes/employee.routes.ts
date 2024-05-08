import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
const employeeController = new EmployeeController();
const employeeRoutes = Router();

employeeRoutes.post("/", employeeController.createEmployee);
employeeRoutes.get("/", employeeController.getEmployees);
employeeRoutes.get("/:id", employeeController.getEmployeeById);
employeeRoutes.get("/name/:name", employeeController.getEmployeeByName);
employeeRoutes.put("/update/:id", employeeController.updateEmployeeById);
employeeRoutes.delete("/delete/:id", employeeController.deleteEmployeeById);

export { employeeRoutes };