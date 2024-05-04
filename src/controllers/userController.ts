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

}