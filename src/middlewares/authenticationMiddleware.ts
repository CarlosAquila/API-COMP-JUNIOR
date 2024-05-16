import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../services/authenticationService';
import { decrypt } from "../utils/crypt"

// Adicione a propriedade userId ao tipo Request
declare module 'express' {
  interface Request {
    userId?: string; 
  }
}

// Função que verifica se o token está presente e é válido
export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', ''); // Permite enviar o token no header sem a palavra Bearer
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }
  try {
    const decodedToken = AuthenticationService.verifyToken(token);
    req.userId = decrypt(decodedToken.userID);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
}