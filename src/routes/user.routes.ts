import { Router } from "express";
import { UserController } from "../controllers/userController";
const userController = new UserController();
const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.get("/", userController.getUsers);
userRoutes.get("/:id", userController.getUserById);


export { userRoutes };
