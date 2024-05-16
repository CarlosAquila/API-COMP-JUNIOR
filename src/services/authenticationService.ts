import jwt from 'jsonwebtoken';
export class AuthenticationService {


  // Função que vai fazer registro


  // Função que vai gerar token com JWT
  static generateToken(userID: string ): string { 
    return jwt.sign( {userID}, process.env.JWT_SECRET as string, { 
      expiresIn: process.env.JWT_EXPIRATION_TIME as string,
    });
  }
  

  // Função que vai verificar token
  static verifyToken(token: string): jwt.JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
  }

  // Função que vai fazer login
  
  

}