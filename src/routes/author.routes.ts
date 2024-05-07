import { Router } from "express";
import { AuthorController } from "../controllers/authorController";
const authorController = new AuthorController();
const authorRoutes = Router();

authorRoutes.post("/", authorController.createAuthor);
authorRoutes.get("/", authorController.getAuthors);
authorRoutes.get("/:id", authorController.getAuthorById);
authorRoutes.get("/name/:name", authorController.getAuthorByName);
authorRoutes.put("/update/:id", authorController.updateAuthorById);
authorRoutes.delete("/delete/:id", authorController.deleteAuthorById);



export { authorRoutes };
