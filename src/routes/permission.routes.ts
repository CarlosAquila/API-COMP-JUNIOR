import { Router } from "express";
import { PermissionController } from "../controllers/permissionController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";

const permissionController = new PermissionController();
const permissionRoutes = Router();

permissionRoutes.post("/", permissionMiddleware(["create permission"]), permissionController.createPermission);

permissionRoutes.use(permissionMiddleware(["read permission"]));

permissionRoutes.get("/", permissionController.getPermissions);
permissionRoutes.get("/:id", permissionController.getPermissionById);
permissionRoutes.get("/name/:name", permissionController.getPermissionByName);

permissionRoutes.put("/update/:id", permissionMiddleware(["update permission"]), permissionController.updatePermissionById);
permissionRoutes.delete("/delete/:id", permissionMiddleware(["delete permission"]), permissionController.deletePermissionById);



export { permissionRoutes };
