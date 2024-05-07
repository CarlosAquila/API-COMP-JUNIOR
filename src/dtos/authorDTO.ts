interface AuthorDTO {
    name: string;
    biography: string;
}

class AuthorDTO {
    constructor(data: AuthorDTO) {
        this.name = this.validateName(data.name);
        this.biography = this.validateBiography(data.biography);
    }

    private validateName(name: string): string {
        if (!name) {
            throw new Error("Name is required");
        }
        return name;
    }

    private validateBiography(biography: string): string {
        return biography;
    }
}

export default AuthorDTO;