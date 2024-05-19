import { Router } from "express";
import { BookController } from "../controllers/bookCrontroller";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";
import { authorRoutes } from "./author.routes";

const bookController = new BookController();
const bookRoutes = Router();

bookRoutes.post("/", permissionMiddleware(["create book"]), bookController.createBook);

authorRoutes.use(permissionMiddleware(["read book"]));

bookRoutes.get("/", bookController.getBooks);
bookRoutes.get("/:id", bookController.getBookById);
bookRoutes.get("/title/:title", bookController.getBookByTitle);
bookRoutes.get("/publisher/:publisherId", bookController.getBooksByPublisher);
bookRoutes.get("/author/:authorId", bookController.getBooksByAuthor);

bookRoutes.put("/update/:id", permissionMiddleware(["update book"]), bookController.updateBookById);
bookRoutes.delete("/delete/:id", permissionMiddleware(["delete book"]), bookController.deleteBookById);

export { bookRoutes };