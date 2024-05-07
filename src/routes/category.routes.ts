import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
const categoryController = new CategoryController();
const categoryRoutes = Router();

categoryRoutes.post("/", categoryController.createCategory);
categoryRoutes.get("/", categoryController.getCategories);
categoryRoutes.get("/:id", categoryController.getCategoryById);
categoryRoutes.get("/name/:name", categoryController.getCategoryByName);
categoryRoutes.put("/update/:id", categoryController.updateCategoryById);
categoryRoutes.delete("/delete/:id", categoryController.deleteCategoryById);



export { categoryRoutes };
