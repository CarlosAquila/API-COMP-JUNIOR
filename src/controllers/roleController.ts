import { Request, Response } from "express";
import { RoleService } from "../services/roleService";
import RoleDTO from "../dtos/roleDTO";

const roleService = new RoleService();

export class RoleController {

  async createRole(req: Request, res: Response) {
    try {
      const roleData: RoleDTO = new RoleDTO(req.body);
      const newRole = await roleService.createRole(roleData);
      return res.status(201).json(newRole);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getRoles(req: Request, res: Response) {
    try {
      const roles = await roleService.getRoles();

      if (!roles || (Array.isArray(roles) && roles.length === 0)) {
        return res.status(404).json({ error: "roles not found" });
      }

      return res.status(200).json(roles);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getRoleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
      return res.status(200).json(role);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getRoleByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const role = await roleService.getRoleByName(name);
      if (!role || (Array.isArray(role) && role.length === 0)) {
        return res.status(404).json({ error: "Role not found" });
      }
      return res.status(200).json(role);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateRoleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const roleData: RoleDTO = new RoleDTO(req.body);
      const updatedRole = await roleService.updateRoleById(id, roleData);
      return res.status(200).json(updatedRole);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteRoleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await roleService.deleteRoleById(id);
      return res.status(204).json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addPermissionsToRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { permissionIds } = req.body;
      if (!permissionIds) {
        return res.status(400).json({ error: "Permission IDs is required" });
      }
      const role = await roleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
      const permission = await roleService.hasPermissions(id, permissionIds);
      if (permission !== null) {
        return res.status(400).json({ error: "Role already have this permission" });
      }
      const updatedRole = await roleService.addPermissionsToRole(id, permissionIds);
      return res.status(200).json(updatedRole);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async removePermissionsFromRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { permissionIds } = req.body;
      if (!permissionIds) {
        return res.status(400).json({ error: "Permission ID is required" });
      }
      const role = await roleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }
      const permission = await roleService.hasPermissions(id, permissionIds);
      if (permission === null) {
        return res.status(400).json({ error: "Role does not have this permission" });
      }
      const updatedRole = await roleService.removePermissionsFromRole(id, permissionIds);
      return res.status(200).json(updatedRole);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

}

