import { ValidationUtils } from "../utils/validationUtils";

interface UserDTO {
    name: string;
    email: string;
    password: string;
    address: string;
}

class UserDTO {
    constructor(data: UserDTO) {
        this.name = this.validateName(data.name);
        this.email = ValidationUtils.validateEmail(data.email);
        this.password = ValidationUtils.validatePassword(data.password);
        this.address = this.validateAddress(data.address);
    }

    private validateName(name: string): string {
        return name;
    }

    private validateAddress(address: string): string {
        return address;
    }
}

export default UserDTO ;