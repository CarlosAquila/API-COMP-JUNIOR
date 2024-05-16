export class ValidationUtils {
    static validateEmail(email: string): string {
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
    static validatePassword(password: string): string {
        if (!password || password.trim() === '') {
            throw new Error("Password is required");
        }
        // regex to validate password  
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // 
        if (!passwordRegex.test(password)) {
            throw new Error("Invalid password format");
        }
        return password;
    }
}