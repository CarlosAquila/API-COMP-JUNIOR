import { BookModel } from '../models/bookModel';
import BookDTO from '../dtos/bookDTO';
const bookModel = new BookModel();

export class BookService {
  async createBook(data: BookDTO) {
    try {
      return bookModel.createBook(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getBooks() {
    try {
      return bookModel.getBooks();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getBookById(id: string) {
    try {
      return bookModel.getBookById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getBookByTitle(title: string) {
    try {
      return bookModel.getBookByTitle(title);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getBooksByAuthor(authorId: string) {
    try {
      return bookModel.getBooksByAuthor(authorId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getBooksByPublisher(publisherId: string) {
    try {
      return bookModel.getBooksByPublisher(publisherId);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateBookById(id: string, data: BookDTO) {
    try {
      return bookModel.updateBookById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteBookById(id: string) {
    try {
      return bookModel.deleteBookById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}