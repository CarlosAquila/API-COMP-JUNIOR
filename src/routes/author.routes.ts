import { Router } from "express";
import { AuthorController } from "../controllers/authorController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";
 
const authorController = new AuthorController();
const authorRoutes = Router();

authorRoutes.post("/", permissionMiddleware(["create author"]), authorController.createAuthor); 

authorRoutes.use(permissionMiddleware(["read author"]));

authorRoutes.get("/",  authorController.getAuthors); 
authorRoutes.get("/:id",  authorController.getAuthorById); 
authorRoutes.get("/name/:name", authorController.getAuthorByName);

authorRoutes.put("/update/:id", permissionMiddleware(["update author"]),authorController.updateAuthorById); 
authorRoutes.delete("/delete/:id", permissionMiddleware(["delete author"]), authorController.deleteAuthorById);



export { authorRoutes };
