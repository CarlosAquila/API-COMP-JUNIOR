import { AuthorModel } from "../models/authorModel";
import AuthorDTO from "../dtos/authorDTO";
const authorModel = new AuthorModel();

export class AuthorService {
  async createAuthor(data: AuthorDTO) {
    try {
      return authorModel.createAuthor(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAuthors() {
    try {
      return authorModel.getAuthors();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAuthorById(id: string) {
    try {
      return authorModel.getAuthorById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAuthorByName(name: string) {
    try {
      return authorModel.getAuthorByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateAuthorById(id: string, data: AuthorDTO) {
    try {
      return authorModel.updateAuthorById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteAuthorById(id: string) {
    try {
      return authorModel.deleteAuthorById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

}