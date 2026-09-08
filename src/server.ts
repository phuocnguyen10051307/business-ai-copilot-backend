import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./shared/infrastructure/database/prisma.client";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not configured. Skipping database connection check.");
    return;
  }

  try {
    await prisma.$connect();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed.");
    console.error(error);
  }
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await checkDatabaseConnection();
});
