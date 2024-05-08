class LoanDTO {
  bookId: string;
  userId: string;
  employeeId: string;
  loanDate: Date;
  returnDate: Date;
  fees: number;
  condition: string;
  paymethod: string;
  returned: boolean;
  dueDate: Date;
  
  constructor(data: any) {
    this.bookId = this.validateBookId(data.bookId);
    this.userId = this.validateUserId(data.userId);
    this.employeeId = this.validateEmployeeId(data.employeeId);
    this.loanDate = this.validateLoanDate(data.loanDate);
    this.returnDate = this.validateReturnDate(data.returnDate);
    this.fees = this.validateFees(data.fees);
    this.condition = this.validateCondition(data.condition);
    this.paymethod = this.validatePaymethod(data.paymethod);
    this.returned = this.validateReturned(data.returned);
    this.dueDate =  this.validateDueDate(data.dueDate);
  }

  validateBookId(bookId: string): string {
    if (!bookId) {
      throw new Error("Book ID is required");
    }
    return bookId;
  }
  
  validateUserId(userId: string): string {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return userId;
  }

  validateEmployeeId(employeeId: string): string {
    if (!employeeId) {
      throw new Error("Employee ID is required");
    }
    return employeeId;
  }

  validateLoanDate(loanDate: Date): Date {
    return loanDate;
  }

  validateReturnDate(returnDate: Date): Date {
    if (returnDate) {
      if (returnDate < new Date()) {
        throw new Error("Return date must be in the future");
      }
    }
    return returnDate;
  }

  validateFees(fees: number): number {
    if (!fees) {
      throw new Error("Fees are required");
    }
    return fees;
  }

  validateCondition(condition: string): string {
    return condition;
  }

  validatePaymethod(paymethod: string): string {
    return paymethod;
  }

  validateReturned(returned: boolean): boolean {

    return returned;
  }

  validateDueDate(dueDate: Date): Date {
    return dueDate;
  }


}

export default LoanDTO;