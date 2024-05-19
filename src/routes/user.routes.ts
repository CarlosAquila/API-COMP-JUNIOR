import { Router } from "express";
import { UserController } from "../controllers/userController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";

const userController = new UserController();
const userRoutes = Router();

userRoutes.post("/", permissionMiddleware(["create user"]), userController.createUser);

userRoutes.use(permissionMiddleware(["read user"]));

userRoutes.get("/", userController.getUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/email/:email", userController.getUserByEmail);

userRoutes.use(permissionMiddleware(["update user"]));

userRoutes.put("/role/:id", userController.addRoleToUser);
userRoutes.put("/permission/:id", userController.addPermissionToUser);
userRoutes.put("/update/:id", userController.updateUserById);

userRoutes.use(permissionMiddleware(["delete user"]));

userRoutes.delete("/role/:id", userController.removeRoleFromUser);
userRoutes.delete("/permission/:id", userController.removePermissionFromUser);
userRoutes.delete("/delete/:id", userController.deleteUserById);





export { userRoutes };
