import { RoleModel } from '../models/roleModel';
import RoleDTO from '../dtos/roleDTO';
const roleModel = new RoleModel();

export class RoleService {
  async createRole(data: RoleDTO) {
    try {
      return roleModel.createRole(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getRoles() {
    try {
      return roleModel.getRoles();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getRoleById(id: string) {
    try {
      return roleModel.getRoleById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getRoleByName(name: string) {
    try {
      return roleModel.getRoleByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateRoleById(id: string, data: RoleDTO) {
    try {
      return roleModel.updateRoleById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteRoleById(id: string) {
    try {
      return roleModel.deleteRoleById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async addPermissionsToRole(id: string, permissionIds: string[]) {
    try {
      return roleModel.addPermissionsToRole(id, permissionIds);
    } catch (error: unknown) {
      throw error;
    }
  }

  async removePermissionsFromRole(id: string, permissionIds: string[]) {
    try {
      return roleModel.removePermissionsFromRole(id, permissionIds);
    } catch (error: unknown) {
      throw error;
    }
  }

  async hasPermissions(roleId: string, permissionIds: string[]) {
    try {
      return roleModel.hasPermissions(roleId, permissionIds);
    } catch (error: unknown) {
      throw error;
    }
  }
}