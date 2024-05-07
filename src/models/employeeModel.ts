import { PrismaClient, Prisma } from "@prisma/client";
import EmployeeDTO from "../dtos/employeeDTO";
import e from "express";
const prisma = new PrismaClient();

export class EmployeeModel {
  async createEmployee(data: EmployeeDTO) {
    try {
      return await prisma.employee.create({
        data: {
          name: data.name,
          cpf: data.cpf,
          telephone: data.telephone,
          address: data.address,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("cpf")) {
          throw new Error("Employee already exists");
        }
      }
      throw error;
    }
  }

  async getEmployees() {
    try {
      return await prisma.employee.findMany({
        where: {
          visible: true,
        },
        orderBy: {
          name: "asc",
        },
        include: {
          loans: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getEmployeeById(id: string) {
    try {
      return await prisma.employee.findUnique({
        where: {
          id,
          visible: true,
        },
        include: {
          loans: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getEmployeeByName(name: string) {
    try {
      return await prisma.employee.findMany({
        where: {
          name: {
            contains: name,
          },
          visible: true,
        },
        orderBy: {
          name: "asc",
        },
        include: {
          loans: {},
        },
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateEmployeeById(id: string, data: EmployeeDTO) {
    try {
      return await prisma.employee.update({
        where: {
          id,
          visible: true,
        },
        data: {
          name: data.name,
          cpf: data.cpf,
          telephone: data.telephone,
          address: data.address,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta && typeof error.meta.target === "string" && error.meta.target.includes("email")) {
          throw new Error("Employee already exists");
        }
        else if (error.code === "P2025") {
          throw new Error("Employee not found");
        }
      }
      throw error;
    }
  }

  async deleteEmployeeById(id: string) {
    try {
      return await prisma.employee.update({
        where: {
          id,
        },
        data: {
          visible: false,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Employee not found");
        }
      }
      throw error;
    }
  }
}