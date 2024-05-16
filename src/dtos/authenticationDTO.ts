import { ValidationUtils } from "../utils/validationUtils";

interface AuthDTO {
    email: string;
    password: string;
}

class AuthDTO implements AuthDTO{
    constructor(data: AuthDTO) {
        this.email = ValidationUtils.validateEmail(data.email);
        this.password = ValidationUtils.validatePassword(data.password);
    }
}

export default AuthDTO;