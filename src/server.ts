import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";
const app: Application = express();
const port = config.port;

// middle ware
app.use(express.json());

// neonDb connect
const pool = new Pool({
  connectionString:
    config.connection_string,
});

const initDB = async () => {
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

initDB();

// create user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [name, email, password];

    const result = await pool.query(query, values);
    console.log(result);

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
});

// get user
// get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      ORDER BY id ASC
    `);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// get single user by id
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT * FROM users
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// put users
// update user by id
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const query = `
      UPDATE users
      SET 
        name = $1,
        email = $2,
        password = $3
      WHERE id = $4
      RETURNING *
    `;

    const values = [name, email, password, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// delete user
// update user by id
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const query = `
      UPDATE users
      SET 
        name = $1,
        email = $2,
        password = $3
      WHERE id = $4
      RETURNING *
    `;

    const values = [name, email, password, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
