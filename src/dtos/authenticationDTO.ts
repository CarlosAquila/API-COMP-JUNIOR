import { ValidationUtils } from "../utils/validationUtils";

interface AuthDTO {
    email: string;
    password: string;
}

class AuthDTO implements AuthDTO{
  email: string;
  password: string;

    constructor(data: AuthDTO) {
        this.email = ValidationUtils.validateEmail(data.email);
        this.password = ValidationUtils.validatePassword(data.password);
    }
}

export default AuthDTO;