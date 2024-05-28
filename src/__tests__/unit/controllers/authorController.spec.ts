import { Request, Response } from 'express';
import { AuthorController } from '../../../controllers/authorController';
import { AuthorService } from '../../../services/authorService';
import { AuthorModel } from '../../../models/authorModel';
import { PrismaClient } from '@prisma/client';
import AuthorDTO from '../../../dtos/authorDTO';


// Mock do PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    author: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  })),
}));

// Mock do AuthorService
jest.mock('../../../services/authorService');

describe('AuthorController', () => {
  let authorController: AuthorController;
  let mockAuthorService: jest.Mocked<AuthorService>;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let authorData: AuthorDTO;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    const mockAuthorModel = new AuthorModel(mockPrisma);
    mockAuthorService = new AuthorService(mockAuthorModel) as jest.Mocked<AuthorService>;
    authorController = new AuthorController(mockAuthorService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    //mockNext = jest.fn();

    authorData = new AuthorDTO({ name: "Novo Autor", biography: "Biografia do novo autor" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAuthor', () => {
    it('should create an author and return it', async () => {
      const createdAuthor = { 
        id: "1",
        name: 'NomeDoAutor',
        biography: 'value value value value' || null,
        createdAt: new Date(),
        visible: true, 
      };

      mockAuthorService.createAuthor.mockResolvedValue(createdAuthor);

      mockRequest = {
        body: authorData,
      };

      await authorController.createAuthor(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdAuthor);
    });

    it('should return 400 when an error occurs', async () => {
      const errorMessage = 'Something went wrong';
      mockAuthorService.createAuthor.mockRejectedValue(new Error(errorMessage));

      mockRequest = {
        body: authorData,
      };

      await authorController.createAuthor(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('should return 500 when an unknown error occurs', async () => {
      mockAuthorService.createAuthor.mockRejectedValue({});

      mockRequest = {
        body: authorData,
      };

      await authorController.createAuthor(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
    

  });

  describe('getAuthorByName', () => {
    it('should return author details when a valid name is provided', async () => {
      const authorData = { 
        id: "1", 
        name: 'NomeDoAutor', 
        biography: 'value value value value' || null, 
        createdAt: new Date(), 
        visible: true, 
        books: [] 
      };
      mockAuthorService.getAuthorByName.mockResolvedValue([authorData]);

      mockRequest = {
        params: {
          name: 'NomeDoAutor',
        },
      };

      await authorController.getAuthorByName(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([authorData]);
    });

    it('should return 404 when the author is not found', async () => {
      mockAuthorService.getAuthorByName.mockResolvedValue([]);

      mockRequest = {
        params: {
          name: 'NomeInexistente',
        },
      };

      await authorController.getAuthorByName(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Author not found' });
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Something went wrong';
      mockAuthorService.getAuthorByName.mockRejectedValue(new Error(errorMessage));

      mockRequest = {
        params: {
          name: 'NomeDoAutor',
        },
      };

      await authorController.getAuthorByName(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getAuthors', () => {
    it('should return all authors', async () => {
      const authorsData = [
        { id: "1", name: 'NomeDoAutor', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: [] },
        { id: "2", name: 'NomeDoAutor2', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: [] },
      ];
      mockAuthorService.getAuthors.mockResolvedValue(authorsData);

      await authorController.getAuthors(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(authorsData);
    });

    it('should return 404 when no authors are found', async () => {
      mockAuthorService.getAuthors.mockResolvedValue([]);

      await authorController.getAuthors(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Authors not found' });
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Something went wrong';
      mockAuthorService.getAuthors.mockRejectedValue(new Error(errorMessage));

      await authorController.getAuthors(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getAuthorById', () => {
    it('should return author details when a valid id is provided', async () => {
      const authorData = { 
        id: "1", 
        name: 'NomeDoAutor', 
        biography: 'value value value value' || null, 
        createdAt: new Date(), 
        visible: true, 
        books: [] 
      };
      mockAuthorService.getAuthorById.mockResolvedValue(authorData);

      mockRequest = {
        params: {
          id: '1',
        },
      };

      await authorController.getAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(authorData);
    });

    it('should return 404 when the author is not found', async () => {
      mockAuthorService.getAuthorById.mockResolvedValue(null);

      mockRequest = {
        params: {
          id: '1',//'nonexistent',
        },
      };

      await authorController.getAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Author not found' });
    });

    it('should handle errors correctly', async () => {
      const errorMessage = 'Something went wrong';
      mockAuthorService.getAuthorById.mockRejectedValue(new Error(errorMessage));

      mockRequest = {
        params: {
          id: '1',
        },
      };

      await authorController.getAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updateAuthorById', () => {
    it('should update an author and return it', async () => {
      const updatedAuthor = { 
        id: "1",
        name: 'NomeDoAutor',
        biography: 'value value value value' || null,
        createdAt: new Date(),
        visible: true, 
        //books: []
      };

      mockAuthorService.updateAuthorById.mockResolvedValue(updatedAuthor);

      mockRequest = {
        params: {
          id: '1',
        },
        body: authorData,
      };

      await authorController.updateAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedAuthor);
    });

    it('should return 400 when an error occurs', async () => {
      const errorMessage = 'Something went wrong';
      mockAuthorService.updateAuthorById.mockRejectedValue(new Error(errorMessage));

      mockRequest = {
        params: {
          id: '1',
        },
        body: authorData,
      };

      await authorController.updateAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('should return 500 when an unknown error occurs', async () => {
      mockAuthorService.updateAuthorById.mockRejectedValue({});

      mockRequest = {
        params: {
          id: '1',
        },
        body: authorData,
      };

      await authorController.updateAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('deleteAuthorById', () => {
    it('should delete an author and return 204', async () => {
      const deletedAuthor = {
        id: '1',
        name: 'NomeDoAutor',
        biography: 'value value value value',
        createdAt: new Date(),
        visible: false,
      };
      mockAuthorService.deleteAuthorById.mockResolvedValue(deletedAuthor);
      mockRequest = {
        params: {
          id: '1',
        },
      };

      await authorController.deleteAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalledWith();
    });

    it('should return 400 when an error occurs', async () => {
      const errorMessage = 'Something went wrong';
      mockAuthorService.deleteAuthorById.mockRejectedValue(new Error(errorMessage));

      mockRequest = {
        params: {
          id: '1',
        },
      };

      await authorController.deleteAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });

    it('should return 500 when an unknown error occurs', async () => {
      mockAuthorService.deleteAuthorById.mockRejectedValue({});

      mockRequest = {
        params: {
          id: '1',
        },
      };

      await authorController.deleteAuthorById(
        mockRequest as Request,
        mockResponse as Response,
        //mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});