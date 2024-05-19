import { Router } from "express";
import { RoleController } from "../controllers/roleController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";

const roleController = new RoleController();
const roleRoutes = Router();

roleRoutes.post("/", roleController.createRole);

roleRoutes.use(permissionMiddleware(["read role"]));

roleRoutes.get("/", roleController.getRoles);
roleRoutes.get("/:id", roleController.getRoleById);
roleRoutes.get("/name/:name", roleController.getRoleByName);

roleRoutes.use(permissionMiddleware(["update role"]));
roleRoutes.put("/update/:id", roleController.updateRoleById);
roleRoutes.put("/permission/:id", roleController.addPermissionsToRole);

roleRoutes.use(permissionMiddleware(["delete role"]));
roleRoutes.delete("/delete/:id", roleController.deleteRoleById);
roleRoutes.delete("/permission/:id", roleController.removePermissionsFromRole);



export { roleRoutes };
