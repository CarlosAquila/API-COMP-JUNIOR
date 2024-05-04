import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, address } = req.body;
    const newUser = await userService.createUser({ name, email, password, address});
    return res.status(201).json(newUser);
  }
}