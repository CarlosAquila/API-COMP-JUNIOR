import { Router } from "express";
import { RoleController } from "../controllers/roleController";
const roleController = new RoleController();
const roleRoutes = Router();

roleRoutes.post("/", roleController.createRole);
roleRoutes.get("/", roleController.getRoles);
roleRoutes.get("/:id", roleController.getRoleById);
roleRoutes.get("/name/:name", roleController.getRoleByName);
roleRoutes.put("/update/:id", roleController.updateRoleById);
roleRoutes.delete("/delete/:id", roleController.deleteRoleById);



export { roleRoutes };
