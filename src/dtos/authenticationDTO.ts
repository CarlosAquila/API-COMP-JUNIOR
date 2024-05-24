import { ValidationUtils } from "../utils/validationUtils";

interface IAuthDTO {
    email: string;
    password: string;
}

class AuthDTO implements IAuthDTO{
  email: string;
  password: string;

    constructor(data: IAuthDTO) {
        this.email = ValidationUtils.validateEmail(data.email);
        this.password = ValidationUtils.validatePassword(data.password);
    }
}

export default AuthDTO;