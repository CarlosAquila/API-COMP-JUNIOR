import { AuthorModel } from "../models/authorModel";
import AuthorDTO from "../dtos/authorDTO";


export class AuthorService {
  private authorModel: AuthorModel;

  constructor(authorModel: AuthorModel) {
    this.authorModel = authorModel;
  }
  
  async createAuthor(data: AuthorDTO) {
    try {
      return await this.authorModel.createAuthor(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAuthors() {
    try {
      return await this.authorModel.getAuthors();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAuthorById(id: string) {
    try {
      return await this.authorModel.getAuthorById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAuthorByName(name: string) {
    try {
      return await this.authorModel.getAuthorByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateAuthorById(id: string, data: AuthorDTO) {
    try {
      return await this.authorModel.updateAuthorById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteAuthorById(id: string) {
    try {
      return await this.authorModel.deleteAuthorById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

}