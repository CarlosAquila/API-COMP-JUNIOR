import { CategoryModel } from '../models/categoryModels';
import CategoryDTO from '../dtos/categoryDTO';
const categoryModel = new CategoryModel();

export class CategoryService {
  async createCategory(data: CategoryDTO) {
    try {
      return categoryModel.createCategory(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getCategories() {
    try {
      return categoryModel.getCategories();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getCategoryById(id: string) {
    try {
      return categoryModel.getCategoryById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getCategoryByName(name: string) {
    try {
      return categoryModel.getCategoryByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateCategoryById(id: string, data: CategoryDTO) {
    try {
      return categoryModel.updateCategoryById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteCategoryById(id: string) {
    try {
      return categoryModel.deleteCategoryById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}