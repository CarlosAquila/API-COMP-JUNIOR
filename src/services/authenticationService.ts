import jwt from 'jsonwebtoken';
const JWT_SECRET = 'meu_segredo_secreto_ inviolavel_que_em_uma_variavel_de_ambiente_deve_estar_e_totalmente_aleatória';
export class AuthenticationService {


  // Função que vai fazer registro


  // Função que vai gerar token com JWT
  static generateToken(userID: string ): string { 
    return jwt.sign( {userID}, process.env.JWT_SECRET as string, { 
      expiresIn: process.env.JWT_EXPIRATION_TIME as string,
    });
  }
  

  // Função que vai verificar token

  // Função que vai fazer login
  
  

}