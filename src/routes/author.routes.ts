import { Router } from "express";
import { AuthorController } from "../controllers/authorController";
import {roleMiddleware, permissionMiddleware } from "../middlewares/accessControlMiddleware";
import { routes } from ".";
 
const authorController = new AuthorController();
const authorRoutes = Router();

authorRoutes.post("/", permissionMiddleware(["create author"]), authorController.createAuthor); // role teve permissão que deu o acesso
//authorRoutes.use(roleMiddleware(["admin"]));
authorRoutes.get("/", permissionMiddleware(["read author"]) , authorController.getAuthors); // usuario teve permissão que deu o acesso
authorRoutes.get("/:id",permissionMiddleware(["read author by id"]),  authorController.getAuthorById); // ninguem teve permissão então não tem acesso
authorRoutes.get("/name/:name", authorController.getAuthorByName);

authorRoutes.use(roleMiddleware(["librarian", "admin"]));

authorRoutes.put("/update/:id",  authorController.updateAuthorById); // essa rota não precisa de permissão somente de role

authorRoutes.use(roleMiddleware(["admin"]));
authorRoutes.delete("/delete/:id", permissionMiddleware(["delete author"]), authorController.deleteAuthorById);



export { authorRoutes };
