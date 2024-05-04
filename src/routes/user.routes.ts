import { Router } from "express";
import { UserController } from "../controllers/userController";
const userController = new UserController();
const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.getUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/email/:email", userController.getUserByEmail);
userRoutes.put("/update/:id", userController.updateUserById);
userRoutes.delete("/delete/:id", userController.deleteUserById);



export { userRoutes };
