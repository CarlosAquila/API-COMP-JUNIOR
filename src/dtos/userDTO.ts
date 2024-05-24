import { ValidationUtils } from "../utils/validationUtils";

interface IUserDTO {
    name?: string;
    email: string;
    password: string;
    address: string;
}

class UserDTO implements IUserDTO{
    name?: string;
    email: string;
    password: string;
    address: string;
    
    constructor(data: IUserDTO) {
        this.name = this.validateName(data.name);
        this.email = ValidationUtils.validateEmail(data.email);
        this.password = ValidationUtils.validatePassword(data.password);
        this.address = this.validateAddress(data.address);
    }

    private validateName(name: string | undefined): string {
      if (!name) {
        return "";
      }
        return name;
    }

    private validateAddress(address: string): string {
        return address;
    }
}

export default UserDTO ;