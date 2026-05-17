import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password } = payload;
    
   const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [name, email, password];

    const result = await pool.query(query, values);
    console.log(result);

    return result;

}

export const userService = {
    createUserIntoDB,
}