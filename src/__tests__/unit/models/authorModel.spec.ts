import { PrismaClient, Prisma } from "@prisma/client";
import { AuthorModel } from "../../../models/authorModel";
import AuthorDTO from "../../../dtos/authorDTO";

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
  Prisma: {
    PrismaClientKnownRequestError: class extends Error {
      code: string;
      meta?: any;
      constructor(message: string, code: string) {
        super(message);
        this.code = code;
        this.meta = { target: ['name'] };
      }
    },
  },
}));

describe("AuthorModel", () => {
  let authorModel: AuthorModel;
  let mockPrisma: jest.Mocked<PrismaClient>;
  let authorData: AuthorDTO;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    authorModel = new AuthorModel(mockPrisma);

    authorData = new AuthorDTO({ name: "Novo Autor", biography: "Biografia do novo autor" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAuthor', () => {
    it("should create a new author", async () => {
      const createdAuthor = {
        id: '1',
        name: authorData.name,
        biography: authorData.biography || '',
        createdAt: new Date(),
        visible: true,
      };

      (mockPrisma.author.create as jest.Mock).mockResolvedValue(createdAuthor);

      const result = await authorModel.createAuthor(authorData);

      expect(result).toEqual(createdAuthor);
      expect(mockPrisma.author.create).toHaveBeenCalledWith({
        data: {
          name: authorData.name,
          biography: authorData.biography,
        },
      });
    });

    it("should throw an error if the author already exists", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        "Author already exists",
        {
          code: "P2002",
          clientVersion: '2.30.0',
          meta: { target: ["name"] },

      });

      //prisma.author.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("Author already exists", "P2002", "author", { target: "name" }));
      (mockPrisma.author.create as jest.Mock).mockRejectedValue(prismaError);
      
      await expect(authorModel.createAuthor(authorData)).rejects.toThrow('Author already exists');
      expect(mockPrisma.author.create).toHaveBeenCalledWith({
        data: {
          name: authorData.name,
          biography: authorData.biography,
        },
      });
    });
  });

  describe('getAuthors', () => {
    it("shold fetch all visible authors", async () => {
      const authorsData = [
        { id: "1", name: 'NomeDoAutor', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: [] },
        { id: "2", name: 'NomeDoAutor2', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: [] },
      ];

      (mockPrisma.author.findMany as jest.Mock).mockResolvedValue(authorsData);

      const result = await authorModel.getAuthors();

      expect(result).toEqual(authorsData);
      expect(mockPrisma.author.findMany).toHaveBeenCalledWith({
        where: {
          visible: true,
        },
        orderBy: {
          name: 'asc',
        },
        include: {
          books: {},
        },
      });
    });

    it("should throw an error if the authors cannot be fetched", async () => {
      const errorMessage = 'Failed to fetch authors';
      (mockPrisma.author.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authorModel.getAuthors()).rejects.toThrow(errorMessage);
      expect(mockPrisma.author.findMany).toHaveBeenCalledWith({
        where: {
          visible: true,
        },
        orderBy: {
          name: 'asc',
        },
        include: {
          books: {},
        },
      });
    });
  });

  describe('getAuthorById', () => {
    it("should fetch an author by id", async () => {
      const authorData = { 
        id: "1", 
        name: 'NomeDoAutor', 
        biography: 'value value value value' || null, 
        createdAt: new Date(), 
        visible: true, 
        books: [] 
      };

      (mockPrisma.author.findUnique as jest.Mock).mockResolvedValue(authorData);

      const result = await authorModel.getAuthorById('1');

      expect(result).toEqual(authorData);
      expect(mockPrisma.author.findUnique).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        include: {
          books: {},
        },
      });
    });

    it("should throw an error if the author cannot be fetched", async () => {
      const errorMessage = 'Failed to fetch author';
      (mockPrisma.author.findUnique as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authorModel.getAuthorById('1')).rejects.toThrow(errorMessage);
      expect(mockPrisma.author.findUnique).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        include: {
          books: {},
        },
      });
    });
  });

  describe('getAuthorByName', () => {
    it("should fetch authors by name", async () => {
      const authorsData = { id: '1', name: 'NomeDoAutor', biography: 'value value value value' || null, createdAt: new Date(), visible: true, books: []  };
      (mockPrisma.author.findMany as jest.Mock).mockResolvedValue([authorsData]);

      const result = await authorModel.getAuthorByName('NomeDoAutor');

      expect(result).toEqual([authorsData]);
      expect(mockPrisma.author.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: 'NomeDoAutor',
          },
          visible: true,
        },
        include: {
          books: {},
        },
      });
    });

    it("should throw an error if the authors cannot be fetched", async () => {
      const errorMessage = 'Failed to fetch authors';
      (mockPrisma.author.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authorModel.getAuthorByName('NomeDoAutor')).rejects.toThrow(errorMessage);
      expect(mockPrisma.author.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: 'NomeDoAutor',
          },
          visible: true,
        },
        include: {
          books: {},
        },
      });
    });
  });

  describe('updateAuthorById', () => {
    it("should update an author by id", async () => {
      const updatedAuthor = {
        id: '1',
        name: authorData.name,
        biography: authorData.biography || '',
        createdAt: new Date(),
        visible: true,
      };

      (mockPrisma.author.update as jest.Mock).mockResolvedValue(updatedAuthor);

      const result = await authorModel.updateAuthorById('1', authorData);

      expect(result).toEqual(updatedAuthor);
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          name: authorData.name,
          biography: authorData.biography,
        },
      });
    });

    it("should throw an error if the author cannot be updated", async () => {
      const errorMessage = 'Failed to update author';
      (mockPrisma.author.update as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authorModel.updateAuthorById('1', authorData)).rejects.toThrow(errorMessage);
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          name: authorData.name,
          biography: authorData.biography,
        },
      });
    });

    it("should throw an error if the author does not exist", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        "Author not found",
        {
          code: "P2010",
          clientVersion: '2.30.0',
          meta: { target: ["id"] },
        });

      (mockPrisma.author.update as jest.Mock).mockRejectedValue(prismaError);

      await expect(authorModel.updateAuthorById('1', authorData)).rejects.toThrow('Author not found');
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          name: authorData.name,
          biography: authorData.biography,
        },
      });
    });

    it("should throw an error if the author already exists", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        "Author already exists",
        {
          code: "P2002",
          clientVersion: '2.30.0',
          meta: { target: ["name"] },
        });

      (mockPrisma.author.update as jest.Mock).mockRejectedValue(prismaError);

      await expect(authorModel.updateAuthorById('1', authorData)).rejects.toThrow('Author already exists');
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          name: authorData.name,
          biography: authorData.biography,
        },
      });
    });

    it("should rethrow unknown errors when updating an author", async () => {
      const errorMessage = 'Failed to update author';
      (mockPrisma.author.update as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authorModel.updateAuthorById('1', authorData)).rejects.toThrow(errorMessage);
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          name: authorData.name,
          biography: authorData.biography,
        },
      });
    });
  });

  describe('deleteAuthorById', () => {
    it("should delete an author by id", async () => {
      const deletedAuthor = {
        id: '1',
        name: 'NomeDoAutor',
        biography: 'value value value value' || null,
        createdAt: new Date(),
        visible: false,
      };

      (mockPrisma.author.update as jest.Mock).mockResolvedValue(deletedAuthor);

      const result = await authorModel.deleteAuthorById('1');

      expect(result).toEqual(deletedAuthor);
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          visible: false,
        },
      });
    });

    it("should throw an error if the author cannot be deleted", async () => {
      const errorMessage = 'Failed to delete author';
      (mockPrisma.author.update as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authorModel.deleteAuthorById('1')).rejects.toThrow(errorMessage);
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          visible: false,
        },
      });
    });

    it("should throw an error if the author does not exist", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        "Author not found",
        {
          code: "P2010",
          clientVersion: '2.30.0',
          meta: { target: ["id"] },
        });

      (mockPrisma.author.update as jest.Mock).mockRejectedValue(prismaError);

      await expect(authorModel.deleteAuthorById('1')).rejects.toThrow('Author not found');
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          visible: false,
        },
      });
    });

    it("should rethrow unknown errors when deleting an author", async () => {
      const errorMessage = 'Failed to delete author';
      (mockPrisma.author.update as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authorModel.deleteAuthorById('1')).rejects.toThrow(errorMessage);
      expect(mockPrisma.author.update).toHaveBeenCalledWith({
        where: {
          id: '1',
          visible: true,
        },
        data: {
          visible: false,
        },
      });
    });
  });


});