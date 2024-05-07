import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";
import CategoryDTO from "../dtos/categoryDTO";

const categoryService = new CategoryService();

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const categoryData: CategoryDTO = new CategoryDTO(req.body);
      const newCategory = await categoryService.createCategory(categoryData);
      return res.status(201).json(newCategory);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getCategories();
      if (!categories || (Array.isArray(categories) && categories.length === 0)) {
        return res.status(404).json({ error: "Categories not found" });
      }
      return res.status(200).json(categories);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      return res.status(200).json(category);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCategoryByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const category = await categoryService.getCategoryByName(name);
      if (!category || (Array.isArray(category) && category.length === 0)) {
        return res.status(404).json({ error: "Category not found" });
      }
      return res.status(200).json(category);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoryData: CategoryDTO = new CategoryDTO(req.body);
      const updatedCategory = await categoryService.updateCategoryById(id, categoryData);
      return res.status(200).json(updatedCategory);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategoryById(id);
      return res.status(204).json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}