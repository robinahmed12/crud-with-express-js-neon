import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
  try {
    // const { name, email, password } = req.body;

    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export const userController = {
    createUser,
}
