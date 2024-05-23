import { Request, Response } from 'express';
import { AuthorController } from '../../controllers/authorController';
import { AuthorService } from '../../services/authorService';

// Mock do AuthorService
jest.mock('../../services/authorService');

describe('AuthorController', () => {
  let authorController: AuthorController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  //let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    authorController = new AuthorController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    //mockNext = jest.fn();
  });

  describe('getAuthorByName', () => {
    it('should return author details when a valid name is provided', async () => {
      const authorData = { name: 'NomeDoAutor', otherProperty: 'value' };
      (AuthorService.prototype.getAuthorByName as jest.Mock).mockResolvedValue(authorData);

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
      expect(mockResponse.json).toHaveBeenCalledWith(authorData);
    });

    it('should return 404 when the author is not found', async () => {
      (AuthorService.prototype.getAuthorByName as jest.Mock).mockResolvedValue(null);

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
      (AuthorService.prototype.getAuthorByName as jest.Mock).mockRejectedValue(new Error(errorMessage));

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
});