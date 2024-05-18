interface RoleDTO {
    name: string;
    description: string;
}

class RoleDTO {
    constructor(data: RoleDTO) {
        this.name = this.validateName(data.name);
        this.description = this.validateDescription(data.description);
    }

    private validateName(name: string): string {
        if (!name) {
            throw new Error("Name is required");
        }
        return name;
    }

    private validateDescription(description: string): string {
        return description;
    }
}

export default RoleDTO;