import dotenv from "dotenv";

dotenv.config();

import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL as string
    }
  }
});

const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log("connection successfull!");
  } catch (error) {
    console.log("connection failed:", error);
    process.exit(1);
  }
}

testConnection();