import e from "express";

interface BookDTO {
    title: string;
    description: string;
    isbn: string;
    year: number;
    publisherId: string;
    authors: string[];
    categories: string[];
    loanTypeId: string;
}

class BookDTO {
    constructor(data: BookDTO) {
        this.title = this.validateTitle(data.title);
        this.description = this.validateDescription(data.description);
        this.isbn = this.validateIsbn(data.isbn);
        this.year = this.validateYear(data.year);
        this.publisherId = this.validatepublisherId(data.publisherId);
        this.authors = this.validateAuthors(data.authors);
        this.categories = this.validateCategories(data.categories);
        this.loanTypeId = this.validateLoanType(data.loanTypeId);
    }

    private validateTitle(title: string): string {
        if (!title) {
            throw new Error("Title is required");
        }
        return title;
    }

    private validateDescription(description: string): string {
        return description;
    }

    private validateIsbn(isbn: string): string {
        if (!isbn) {
            throw new Error("ISBN is required");
        }
        else if (isbn.length !== 13) {
            throw new Error("ISBN must have 13 characters");
        }
        return isbn;
    }

    private validateYear(year: number): number {
        if (!year) {
            throw new Error("Year is required");
        }
        //verifica se o ano é string
        else if (typeof year !== "number") {
            throw new Error("Year must be a number");
        }
        else if (year < 0) {
            throw new Error("Year must be a positive number");
        }
        else if (year > new Date().getFullYear()) {
            throw new Error("Year must be less than or equal to the current year");
        }
        return year;
    }

    private validatepublisherId(publisherId: string): string {
        if (!publisherId) {
            throw new Error("Publisher ID is required");
        }
        return publisherId;
    }

    private validateAuthors(authors: string[]): string[] {
      if (!authors) {
        throw new Error("Authors are required");
      }
      return authors;
    }

    private validateCategories(categories: string[]): string[] {
      if (!categories) {
        throw new Error("Categories are required");
      }
      return categories;
    }

    private validateLoanType(loanType: string): string {
      if (!loanType) {
        throw new Error("Loan type is required");
      }
      return loanType;
    }
}

export default BookDTO;