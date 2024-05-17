import { Router } from "express";
import { PermissionController } from "../controllers/permissionController";
const permissionController = new PermissionController();
const permissionRoutes = Router();

permissionRoutes.post("/", permissionController.createPermission);
permissionRoutes.get("/", permissionController.getPermissions);
permissionRoutes.get("/:id", permissionController.getPermissionById);
permissionRoutes.get("/name/:name", permissionController.getPermissionByName);
permissionRoutes.put("/update/:id", permissionController.updatePermissionById);
permissionRoutes.delete("/delete/:id", permissionController.deletePermissionById);



export { permissionRoutes };
