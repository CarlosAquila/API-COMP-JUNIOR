import { AuthorService } from '../../../services/authorService';
import { AuthorModel } from '../../../models/authorModel';
import { PrismaClient } from '@prisma/client';
import AuthorDTO from '../../../dtos/authorDTO';


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

// Mock do AuthorModel
jest.mock('../../../models/authorModel');

describe('AuthorService', () => {
  let authorService: AuthorService;
  let mockAuthorModel: jest.Mocked<AuthorModel>;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let authorData: AuthorDTO;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    mockAuthorModel = new AuthorModel(mockPrisma) as jest.Mocked<AuthorModel>;
    authorService = new AuthorService(mockAuthorModel);
    authorData = new AuthorDTO({ name: "Novo Autor", biography: "Biografia do novo autor" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAuthor', () => {
    it('should create a new author and return the author details', async () => {
      const authorData = new AuthorDTO({ name: 'Novo Autor', biography: 'Biografia do novo' });
      const createdAuthor = {
        id: '1',
        name: authorData.name,
        biography: authorData.biography || '',
        createdAt: new Date(), // Adicione a data de criação aqui
        visible: true, // Inclua outras propriedades esperadas
      };

      mockAuthorModel.createAuthor.mockResolvedValue(createdAuthor);

      const result = await authorService.createAuthor(authorData);

      expect(result).toEqual(createdAuthor);
      expect(mockAuthorModel.createAuthor).toHaveBeenCalledWith(authorData);
      expect(mockAuthorModel.createAuthor).toHaveBeenCalledTimes(1);
      expect(mockAuthorModel.createAuthor).toHaveReturnedTimes(1);
    });

    it('should throw an error if author creation fails', async () => {
      const authorData = new AuthorDTO({ name: 'Novo Autor', biography: 'Biografia grande de mais' });
      const errorMessage = 'Something went wrong';

      mockAuthorModel.createAuthor.mockRejectedValue(new Error(errorMessage));

      await expect(authorService.createAuthor(authorData)).rejects.toThrow(errorMessage);
      expect(mockAuthorModel.createAuthor).toHaveBeenCalledWith(authorData);
      expect(mockAuthorModel.createAuthor).toHaveBeenCalledTimes(1);
      expect(mockAuthorModel.createAuthor).toHaveReturnedTimes(1);
    });

    it('should throw an error if author already exists', async () => {
      const authorData = new AuthorDTO({ name: 'Novo Autor', biography: 'Biografia grande de mais' });
      const errorMessage = 'Author already exists';

      mockAuthorModel.createAuthor.mockRejectedValue(new Error(errorMessage));

      await expect(authorService.createAuthor(authorData)).rejects.toThrow(errorMessage);
      expect(mockAuthorModel.createAuthor).toHaveBeenCalledWith(authorData);
      expect(mockAuthorModel.createAuthor).toHaveBeenCalledTimes(1);
      expect(mockAuthorModel.createAuthor).toHaveReturnedTimes(1);
    });

    describe('getAuthors', () => {
      it('should return all authors', async () => {
        const authorsData = [
          { id: '1', name: 'NomeDoAutor', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: []  },
          { id: '2', name: 'NomeDoAutor2', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: []  },
        ];
        mockAuthorModel.getAuthors.mockResolvedValue(authorsData);
  
        const result = await authorService.getAuthors();
  
        expect(result).toEqual(authorsData);
        expect(mockAuthorModel.getAuthors).toHaveBeenCalled();
      });
  
      it('should throw an error when the model throws an error', async () => {
        const errorMessage = 'Something went wrong';
        mockAuthorModel.getAuthors.mockRejectedValue(new Error(errorMessage));
  
        await expect(authorService.getAuthors()).rejects.toThrow(errorMessage);
      });
    });
  
    describe('getAuthorById', () => {
      it('should return an author by id', async () => {
        const authorData = { 
          id: "1", 
          name: 'NomeDoAutor', 
          biography: 'value value value value' || null, 
          createdAt: new Date(), 
          visible: true, 
          books: [] 
        };
        mockAuthorModel.getAuthorById.mockResolvedValue(authorData);
  
        const result = await authorService.getAuthorById('1');
  
        expect(result).toEqual(authorData);
        expect(mockAuthorModel.getAuthorById).toHaveBeenCalledWith('1');
      });
  
      it('should throw an error when the model throws an error', async () => {
        const errorMessage = 'Something went wrong';
        mockAuthorModel.getAuthorById.mockRejectedValue(new Error(errorMessage));
  
        await expect(authorService.getAuthorById('1')).rejects.toThrow(errorMessage);
      });
    });
  
    describe('getAuthorByName', () => {
      it('should return authors by name', async () => {
        const authorsData = { id: '1', name: 'NomeDoAutor', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: []  };
        mockAuthorModel.getAuthorByName.mockResolvedValue([authorsData]);
  
        const result = await authorService.getAuthorByName('NomeDoAutor');
  
        expect(result).toEqual([authorsData]);
        expect(mockAuthorModel.getAuthorByName).toHaveBeenCalledWith('NomeDoAutor');
      });
  
      it('should throw an error when the model throws an error', async () => {
        const errorMessage = 'Something went wrong';
        mockAuthorModel.getAuthorByName.mockRejectedValue(new Error(errorMessage));
  
        await expect(authorService.getAuthorByName('NomeDoAutor')).rejects.toThrow(errorMessage);
      });
    });
  
    describe('updateAuthorById', () => {
      it('should update an author by id and return it', async () => {
        const updatedAuthor = { 
          id: '1',
          name: 'NomeDoAutor',
          biography: 'value value value value',
          createdAt: new Date(),
          visible: false
        };
        mockAuthorModel.updateAuthorById.mockResolvedValue(updatedAuthor);
  
        const result = await authorService.updateAuthorById('1', authorData);
  
        expect(result).toEqual(updatedAuthor);
        expect(mockAuthorModel.updateAuthorById).toHaveBeenCalledWith('1', authorData);
      });
  
      it('should throw an error when the model throws an error', async () => {
        const errorMessage = 'Something went wrong';
        mockAuthorModel.updateAuthorById.mockRejectedValue(new Error(errorMessage));
  
        await expect(authorService.updateAuthorById('1', authorData)).rejects.toThrow(errorMessage);
      });
    });
  
    describe('deleteAuthorById', () => {
      it('should delete an author by id and return it', async () => {
        const deletedAuthor = { 
          id: '1',
          name: 'NomeDoAutor',
          biography: 'value value value value',
          createdAt: new Date(),
          visible: false
        };
        mockAuthorModel.deleteAuthorById.mockResolvedValue(deletedAuthor);
  
        const result = await authorService.deleteAuthorById('1');
  
        expect(result).toEqual(deletedAuthor);
        expect(mockAuthorModel.deleteAuthorById).toHaveBeenCalledWith('1');
      });
  
      it('should throw an error when the model throws an error', async () => {
        const errorMessage = 'Something went wrong';
        mockAuthorModel.deleteAuthorById.mockRejectedValue(new Error(errorMessage));
  
        await expect(authorService.deleteAuthorById('1')).rejects.toThrow(errorMessage);
      });
    });
  });
});