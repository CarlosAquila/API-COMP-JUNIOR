import { Request, Response } from 'express';
import { EmployeeService } from '../services/employeeService';
import EmployeeDTO from '../dtos/employeeDTO';

const employeeService = new EmployeeService();

export class EmployeeController {
  async createEmployee(req: Request, res: Response) {
    try {
      const employeeData: EmployeeDTO = new EmployeeDTO(req.body);
      const newEmployee = await employeeService.createEmployee(employeeData);
      return res.status(201).json(newEmployee);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getEmployees(req: Request, res: Response) {
    try {
      const employees = await employeeService.getEmployees();
      if (!employees || (Array.isArray(employees) && employees.length === 0)) {
        return res.status(404).json({ error: 'Employees not found' });
      }
      return res.status(200).json(employees);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getEmployeeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employee = await employeeService.getEmployeeById(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(200).json(employee);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getEmployeeByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const employee = await employeeService.getEmployeeByName(name);
      if (!employee || (Array.isArray(employee) && employee.length === 0)) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      return res.status(200).json(employee);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateEmployeeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employeeData: EmployeeDTO = new EmployeeDTO(req.body);
      const updatedEmployee = await employeeService.updateEmployeeById(id, employeeData);
      return res.status(200).json(updatedEmployee);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteEmployeeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await employeeService.deleteEmployeeById(id);
      return res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}