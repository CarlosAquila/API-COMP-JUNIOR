import { Request, Response } from "express";
import { AuthorService } from "../services/authorService";
import AuthorDTO from "../dtos/authorDTO";

const authorService = new AuthorService();

export class AuthorController {

  async createAuthor(req: Request, res: Response) {
    try {
      const authorData: AuthorDTO = new AuthorDTO(req.body);
      const newAuthor = await authorService.createAuthor(authorData);
      return res.status(201).json(newAuthor);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAuthors(req: Request, res: Response) {
    try {
      const authors = await authorService.getAuthors();
      if (!authors || (Array.isArray(authors) && authors.length === 0)) {
        return res.status(404).json({ error: "Authors not found" });
      }
      return res.status(200).json(authors);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAuthorById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const author = await authorService.getAuthorById(id);
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }
      return res.status(200).json(author);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAuthorByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const author = await authorService.getAuthorByName(name);
      if (!author || (Array.isArray(author) && author.length === 0)) {
        return res.status(404).json({ error: "Author not found" });
      }
      return res.status(200).json(author);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateAuthorById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authorData: AuthorDTO = new AuthorDTO(req.body);
      const updatedAuthor = await authorService.updateAuthorById(id, authorData);
      return res.status(200).json(updatedAuthor);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteAuthorById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await authorService.deleteAuthorById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }


}