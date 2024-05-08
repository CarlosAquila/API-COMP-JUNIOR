import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import BookDTO from "../dtos/bookDTO";

const bookService = new BookService();

export class BookController {
  
    async createBook(req: Request, res: Response) {
      try {
        const bookData: BookDTO = new BookDTO(req.body);
        const newBook = await bookService.createBook(bookData);
        return res.status(201).json(newBook);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  
    async getBooks(req: Request, res: Response) {
      try {
        const books = await bookService.getBooks();
        if (!books || (Array.isArray(books) && books.length === 0)) {
          return res.status(404).json({ error: "Books not found" });
        }
        return res.status(200).json(books);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  
    async getBookById(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);
        if (!book) {
          return res.status(404).json({ error: "Book not found" });
        }
        return res.status(200).json(book);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  
    async getBookByTitle(req: Request, res: Response) {
      try {
        const { title } = req.params;
        const book = await bookService.getBookByTitle(title);
        if (!book || (Array.isArray(book) && book.length === 0)) {
          return res.status(404).json({ error: "Book not found" });
        }
        return res.status(200).json(book);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    async updateBookById(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const bookData: BookDTO = new BookDTO(req.body);
        const updatedBook = await bookService.updateBookById(id, bookData);
        return res.status(200).json(updatedBook);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    }

    async deleteBookById(req: Request, res: Response) {
      try {
        const { id } = req.params;
        await bookService.deleteBookById(id);
        return res.status(200).json({ message: "Book deleted successfully" });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    }
}