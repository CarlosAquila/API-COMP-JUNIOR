import { Request, Response } from "express";
import { PermissionService } from "../services/permissionService";
import PermissionDTO from "../dtos/permissionDTO";

const permissionService = new PermissionService();

export class PermissionController {

  async createPermission(req: Request, res: Response) {
    try {
      const permissionData: PermissionDTO = new PermissionDTO(req.body);
      const newPermission = await permissionService.createPermission(permissionData);
      return res.status(201).json(newPermission);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPermissions(req: Request, res: Response) {
    try {
      const permissions = await permissionService.getPermissions();

      if (!permissions || (Array.isArray(permissions) && permissions.length === 0)) {
        return res.status(404).json({ error: "permissions not found" });
      }

      return res.status(200).json(permissions);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPermissionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const permission = await permissionService.getPermissionById(id);
      if (!permission) {
        return res.status(404).json({ error: "Permission not found" });
      }
      return res.status(200).json(permission);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPermissionByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const permission = await permissionService.getPermissionByName(name);
      if (!permission || (Array.isArray(permission) && permission.length === 0)) {
        return res.status(404).json({ error: "Permission not found" });
      }
      return res.status(200).json(permission);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updatePermissionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const permissionData: PermissionDTO = new PermissionDTO(req.body);
      const updatedPermission = await permissionService.updatePermissionById(id, permissionData);
      return res.status(200).json(updatedPermission);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deletePermissionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await permissionService.deletePermissionById(id);
      return res.status(204).json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

}

