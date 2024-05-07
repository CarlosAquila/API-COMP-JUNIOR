interface PublisherDTO {
    name: string;
    address: string;
}

class PublisherDTO {
    constructor(data: PublisherDTO) {
        this.name = this.validateName(data.name);
        this.address = this.validateAddress(data.address);
    }

    private validateName(name: string): string {
        if (!name) {
            throw new Error("Name is required");
        }
        return name;
    }

    private validateAddress(address: string): string {
        return address;
    }
}

export default PublisherDTO;