import express, { Request, Response } from "express";
import prisma from "./config/database";

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware to parse JSON requests
 */
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Shoppie API is running");
});

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});