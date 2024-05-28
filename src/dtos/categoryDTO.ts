interface ICategoryDTO {
    name: string;
    description?: string;
}

class CategoryDTO implements ICategoryDTO {
  name: string;
  description?: string;

    constructor(data: ICategoryDTO) {
        this.name = this.validateName(data.name);
        this.description = this.validateDescription(data.description);
    }

    private validateName(name: string): string {
        if (!name) {
            throw new Error("Name is required");
        }
        return name;
    }

    private validateDescription(description?: string): string  | undefined {
        return description;
    }
}

export default CategoryDTO;