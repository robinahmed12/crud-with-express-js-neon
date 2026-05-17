import config from "../config";
import { Pool } from "pg";

// neonDb connect
export const pool = new Pool({
  connectionString:
    config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};