import jwt from 'jsonwebtoken';
export class AuthenticationService {


  // Função que vai fazer registro


  // Função que vai gerar token com JWT
  static async generateToken(userID: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign({ userID }, process.env.JWT_SECRET as string, { 
        expiresIn: process.env.JWT_EXPIRATION_TIME as string },
        (err, token) => {
          if (err) reject(err);
          else resolve(token as string);
        }
      );
    });
  }

  // Função que vai verificar token
  static async verifyToken(token: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded as jwt.JwtPayload);
      });
    });
  }

  // Função que vai fazer login
  
  
  static generateResetToken = async (userID: string, email: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      jwt.sign({ userID, email }, process.env.JWT_SECRET as string,  {
          expiresIn: process.env.JWT_EXPIRATION_TIME as string },
          (err, token) => {
            if (err) reject(err);
            else resolve(token as string);
          }
        );
        // Enviar e-mail com o link de redefinição de senha com um serviço de e-mail, Nodemailer
    });
  };


  static validateResetToken = async (token: string): Promise<jwt.JwtPayload> => {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; email: string };
        resolve(decoded as jwt.JwtPayload);
      } catch (error) {
        reject(new Error("Invalid or expired reset token"));
      }
    });
  };
}