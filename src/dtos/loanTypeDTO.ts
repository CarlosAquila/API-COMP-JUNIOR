interface LoanTypeDTO {
  name: string;
  fine: number;
  day: number;
  description: string;
}

class LoanTypeDTO {
  constructor(data: LoanTypeDTO) {
    this.name = this.validateName(data.name);
    this.fine = this.validateFine(data.fine);
    this.day = this.validateDay(data.day);
    this.description = this.validateDescription(data.description);
  }

  private validateName(name: string): string {
    if (!name) {
      throw new Error("Name is required");
    }
    return name;
  }

  private validateFine(fine: number): number {
    if (!fine) {
      throw new Error("Fine is required");
    }
    return fine;
  }

  private validateDay(day: number): number {
    if (!day) {
      throw new Error("Day is required");
    }
    return day;
  }

  private validateDescription(description: string): string {
    return description;
  }
}

export default LoanTypeDTO;