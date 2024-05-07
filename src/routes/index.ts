import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authorRoutes } from "./author.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/authors", authorRoutes);

export { routes };