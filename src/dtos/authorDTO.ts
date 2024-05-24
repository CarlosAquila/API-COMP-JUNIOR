interface IAuthorDTO {
  name: string;
  biography?: string;
}

class AuthorDTO implements IAuthorDTO {
  name: string;
  biography?: string;

  constructor(data: IAuthorDTO) {
      this.name = this.validateName(data.name);
      this.biography = this.validateBiography(data.biography);
  }

  private validateName(name: string): string {
      if (!name) {
          throw new Error("Name is required");
      }
      return name;
  }

  private validateBiography(biography?: string): string | undefined {
    if (biography && biography.length < 15) {
      throw new Error("Biography is too short");
    } 
    return biography;
  }
}

export default AuthorDTO;