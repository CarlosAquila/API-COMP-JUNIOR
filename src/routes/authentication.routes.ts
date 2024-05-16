import { Router } from "express";
import { AuthenticationController } from "../controllers/authenticationController";
const authenticationController = new AuthenticationController();
const authenticationRoutes = Router();

authenticationRoutes.post("/register", authenticationController.register);
authenticationRoutes.post("/login", authenticationController.login);
authenticationRoutes.post("/forgot-password", authenticationController.forgotPassword);
authenticationRoutes.get("/reset-password/:token", authenticationController.resetPassword);
authenticationRoutes.post("/reset-password/:token", authenticationController.updateUserPassword);

export { authenticationRoutes };