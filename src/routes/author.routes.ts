import { Router } from "express";
import { AuthorController } from "../controllers/authorController";
import { AuthorService } from "../services/authorService";
import { AuthorModel } from "../models/authorModel";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";
import { PrismaClient } from "@prisma/client"; 


const prisma = new PrismaClient();
const authorModel = new AuthorModel(prisma); 
const authorService = new AuthorService(authorModel);
const authorController = new AuthorController(authorService);

const authorRoutes = Router();

authorRoutes.post("/", permissionMiddleware(["create author"]), authorController.createAuthor.bind(authorController)); 

authorRoutes.use(permissionMiddleware(["read author"]));

authorRoutes.get("/",  authorController.getAuthors.bind(authorController)); 
authorRoutes.get("/:id",  authorController.getAuthorById.bind(authorController)); 
authorRoutes.get("/name/:name", authorController.getAuthorByName.bind(authorController));

authorRoutes.put("/update/:id", permissionMiddleware(["update author"]),authorController.updateAuthorById.bind(authorController)); 
authorRoutes.delete("/delete/:id", permissionMiddleware(["delete author"]), authorController.deleteAuthorById.bind(authorController));



export { authorRoutes };
