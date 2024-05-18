import { Request, Response } from "express";
import { UserService } from "../services/userService";
import UserDTO from "../dtos/userDTO";

const userService = new UserService();

export class UserController {

  async createUser(req: Request, res: Response) {
    try {
      const userData: UserDTO = new UserDTO(req.body);
      const newUser = await userService.createUser(userData);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();

      if (!users || (Array.isArray(users) && users.length === 0)) {
        return res.status(404).json({ error: "users not found" });
      }

      return res.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await userService.getUserByEmail(email);
      if (!user || (Array.isArray(user) && user.length === 0)) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData: UserDTO = new UserDTO(req.body);
      const updatedUser = await userService.updateUserById(id, userData);
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userService.deleteUserById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addRoleToUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { roleId } = req.body; 
      if (!roleId) {
        return res.status(400).json({ error: "Role id is required" });
      }
      const role = await userService.hasRole(id, roleId);
      if (role !== null) {
        return res.status(400).json({ error: "User already have this role" });
      }
      const updatedUser = await userService.addRoleToUser(id, roleId);
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async removeRoleFromUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { roleId } = req.body; 
      if (!roleId) {
        return res.status(400).json({ error: "Role id is required" });
      }
      const role = await userService.hasRole(id, roleId);
      if (role === null) {
        return res.status(400).json({ error: "User does not have this role" });
      }
      const updatedUser = await userService.removeRoleFromUser(id, roleId);
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addPermissionToUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { permissionId } = req.body;
      if (!permissionId) {
        return res.status(400).json({ error: "Permission id is required" });
      }
      const permission = await userService.hasPermission(id, permissionId);
      if (permission !== null) {
        return res.status(400).json({ error: "User already have this permission" });
      }
      const updatedUser = await userService.addPermissionToUser(id, permissionId);
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async removePermissionFromUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { permissionId } = req.body;
      if (!permissionId) {
        return res.status(400).json({ error: "Permission id is required" });
      }
      const permission = await userService.hasPermission(id, permissionId);
      if (permission === null) {
        return res.status(400).json({ error: "User does not have this permission" });
      }
      const updatedUser = await userService.removePermissionFromUser(id, permissionId);
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

}