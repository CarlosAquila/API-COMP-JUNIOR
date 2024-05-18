import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();


// Função que verifica se o usuário tem permissão para acessar a rota
export function permissionMiddleware(permissionsRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ error: 'User is not authenticated' });
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Verifica se o usuário tem a role 'admin'
    const userRoles = user.roles.map((role) => role.name);
    if (userRoles.includes('admin')) {
      return next();
    }
    
    // Verifica as permissões diretamente atribuídas ao usuário
    const userPermissions = user.permissions.map((permission) => permission.name);
    const hasPermission = userPermissions.some((perm) => permissionsRoutes.includes(perm));
    if (hasPermission) {
      //return res.status(401).json({ error: 'User does not have permission' });
      return next();
    }
    // Se o usuário não tiver a permissão diretamente, verifica as permissões das roles
    const roles = user.roles;
    const rolesPermissions = roles.map((role) => role.permissions).flat(); // 
    const rolesPermissionsNames = rolesPermissions.map((permission) => permission.name); 
    const hasRolePermission = rolesPermissionsNames.some((perm) => permissionsRoutes.includes(perm));
    if (!hasRolePermission) {
      return res.status(401).json({ error: 'User does not have permission' });
    }

    next();
  };
}

// Função que verifica se o usuário tem um dos roles necessários para acessar a rota
export function roleMiddleware(rolesRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ error: 'User is not authenticated' });
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const userRoles = user.roles.map((role) => role.name);
    // verifica se o usuário tem pelo menos um dos roles necessários
    const hasRole = rolesRoutes.some((role) => userRoles.includes(role));

    //const hasRole = userRoles.some((role) => rolesRoutes.includes(role));
    //const hasRole = rolesRoutes.some((role) => userRoles.includes(role));
    if (!hasRole) {
      return res.status(401).json({ error: 'User does not have the required role' });
    }
    next();
  };
}