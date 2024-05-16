import { Router } from "express";
import { AuthenticationController } from "../controllers/authenticationController";
const authenticationController = new AuthenticationController();
const authenticationRoutes = Router();

authenticationRoutes.post("/register", authenticationController.register);
authenticationRoutes.post("/login", authenticationController.login);
authenticationRoutes.post("/forgot-password", authenticationController.forgotPassword);
authenticationRoutes.post("/reset-password", authenticationController.resetPassword);

export { authenticationRoutes };