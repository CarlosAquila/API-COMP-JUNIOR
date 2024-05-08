import { EmployeeModel } from '../models/employeeModel';
import EmployeeDTO from '../dtos/employeeDTO';
const employeeModel = new EmployeeModel();

export class EmployeeService {
  async createEmployee(data: EmployeeDTO) {
    try {
      return employeeModel.createEmployee(data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getEmployees() {
    try {
      return employeeModel.getEmployees();
    } catch (error: unknown) {
      throw error;
    }
  }

  async getEmployeeById(id: string) {
    try {
      return employeeModel.getEmployeeById(id);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getEmployeeByName(name: string) {
    try {
      return employeeModel.getEmployeeByName(name);
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateEmployeeById(id: string, data: EmployeeDTO) {
    try {
      return employeeModel.updateEmployeeById(id, data);
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteEmployeeById(id: string) {
    try {
      return employeeModel.deleteEmployeeById(id);
    } catch (error: unknown) {
      throw error;
    }
  }
}