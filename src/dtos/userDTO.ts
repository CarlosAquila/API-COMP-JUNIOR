interface UserDTO {
    name: string;
    email: string;
    password: string;
    address: string;
}

class UserDTO {
    constructor(data: any) {
        this.name = this.validateName(data.name);
        this.email = this.validateEmail(data.email);
        this.password = this.validatePassword(data.password);
        this.address = this.validateAddress(data.address);
    }

    private validateName(name: string): string {
        return name;
    }

    private validateEmail(email: string): string {
        if (!email || email.trim() === '') { 
            throw new Error("Email is required");
        }
        // regex to validate email  
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
        return email;
    }

    //metodo para validar a senha no DTO deve ter no minimo 6 caracteres e conter letras e numeros
    private validatePassword(password: string): string {
        if (!password || password.trim() === '') {
            throw new Error("Password is required");
        }
        // regex to validate password  
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("Invalid password format");
        }
        return password;
    }

    private validateAddress(address: string): string {
        return address;
    }
}

export default UserDTO ;