import app from "./app";
import { prisma } from "./utils/prismaClient";
const port = Number(process.env.PORT) || 3000;

async function connectToDb() {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1); // Optional: Exit app if DB is critical
  }
}
connectToDb()
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
