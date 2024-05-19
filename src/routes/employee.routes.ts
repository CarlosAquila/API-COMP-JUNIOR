import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";

const employeeController = new EmployeeController();
const employeeRoutes = Router();

employeeRoutes.post("/", permissionMiddleware(["create employee"]), employeeController.createEmployee);

employeeRoutes.use(permissionMiddleware(["read employee"]));

employeeRoutes.get("/", employeeController.getEmployees);
employeeRoutes.get("/:id", employeeController.getEmployeeById);
employeeRoutes.get("/name/:name", employeeController.getEmployeeByName);

employeeRoutes.put("/update/:id", permissionMiddleware(["update employee"]), employeeController.updateEmployeeById);
employeeRoutes.delete("/delete/:id", permissionMiddleware(["delete employee"]), employeeController.deleteEmployeeById);

export { employeeRoutes };