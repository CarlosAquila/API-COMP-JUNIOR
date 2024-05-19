import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { permissionMiddleware } from "../middlewares/accessControlMiddleware";

const categoryController = new CategoryController();
const categoryRoutes = Router();

categoryRoutes.post("/", permissionMiddleware(["create category"]) ,categoryController.createCategory);

categoryRoutes.use(permissionMiddleware(["read category"]));

categoryRoutes.get("/", categoryController.getCategories);
categoryRoutes.get("/:id", categoryController.getCategoryById);
categoryRoutes.get("/name/:name", categoryController.getCategoryByName);

categoryRoutes.put("/update/:id", permissionMiddleware(["update category"]), categoryController.updateCategoryById);
categoryRoutes.delete("/delete/:id", permissionMiddleware(["delete category"]), categoryController.deleteCategoryById);



export { categoryRoutes };
