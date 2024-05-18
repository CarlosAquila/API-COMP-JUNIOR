import { PermissionModel } from '../models/permissionModel';
import PermissionDTO from '../dtos/permissionDTO';
const permissionModel = new PermissionModel();

export class PermissionService {
  async createPermission(data: PermissionDTO) {
    try {
      return permissionModel.createPermission(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPermissions() {
    try {
      return permissionModel.getPermissions();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPermissionById(id: string) {
    try {
      return permissionModel.getPermissionById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getPermissionByName(name: string) {
    try {
      return permissionModel.getPermissionByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updatePermissionById(id: string, data: PermissionDTO) {
    try {
      return permissionModel.updatePermissionById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deletePermissionById(id: string) {
    try {
      return permissionModel.deletePermissionById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}