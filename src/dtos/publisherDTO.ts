interface IPublisherDTO {
    name: string;
    address?: string;
}

class PublisherDTO implements IPublisherDTO{
    name: string;
    address?: string;

    constructor(data: IPublisherDTO) {
        this.name = this.validateName(data.name);
        this.address = this.validateAddress(data.address);
    }

    private validateName(name: string): string {
        if (!name) {
            throw new Error("Name is required");
        }
        return name;
    }

    private validateAddress(address?: string): string | undefined{
        return address;
    }
}

export default PublisherDTO;