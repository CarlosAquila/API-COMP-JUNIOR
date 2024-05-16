import { Router } from "express";
import { AuthenticationController } from "../controllers/authenticationController";
const authenticationController = new AuthenticationController();
const authenticationRoutes = Router();

authenticationRoutes.post("/register", authenticationController.register);
authenticationRoutes.post("/login", authenticationController.login);

export { authenticationRoutes };