import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";
import connectDB from "./config/db.js";
import { User } from "./models/user.js";

dotenv.config({ quiet: true });

const app = express();
const httpServer = createServer(app);

// ----- Middleware -----
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ----- Routes -----
app.get("/api-test", (req, res) => {
  res.json({ message: "API test route works!" });
});

app.use("/api", routes);

// ----- Error Handling -----
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// ----- Start Server -----
const PORT = process.env.PORT || 5000;

async function ensureSuperAdmin(): Promise<void> {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const clerkId = process.env.SUPER_ADMIN_CLERK_ID;
  const name = process.env.SUPER_ADMIN_NAME || "Super Admin";

  if (!email || !clerkId) {
    console.warn(
      "SUPER_ADMIN_EMAIL or SUPER_ADMIN_CLERK_ID not set. Skipping SUPER_ADMIN bootstrap."
    );
    return;
  }

  const existing = await User.findOne({ role: "SUPER_ADMIN" });

  if (!existing) {
    await User.create({
      clerkId,
      role: "SUPER_ADMIN",
      name,
      email,
      isActive: true,
      isBlocked: false,
    });
    console.log("✅ SUPER_ADMIN user created");
    return;
  }

  // Keep SUPER_ADMIN email in sync with configuration
  if (existing.email !== email) {
    existing.email = email;
    await existing.save();
    console.log("✅ SUPER_ADMIN email updated to configured SUPER_ADMIN_EMAIL");
  }
}

async function startServer() {
  // Connect MongoDB Atlas for Socket.IO
  const mongoClient = new MongoClient(process.env.MONGODB_URI!);
  await mongoClient.connect();

  const mongoCollection = mongoClient
    .db("parthasarathi") // your DB name
    .collection("socket.io-adapter"); // create a collection for Socket.IO messages

  // ----- Socket.IO Setup -----
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.adapter(createAdapter(mongoCollection));

  // Connect your main DB (Mongoose)
  await connectDB();

  // Ensure there is exactly one SUPER_ADMIN with the configured identity
  await ensureSuperAdmin();

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("✅ Socket.IO adapter connected to MongoDB");
  });
}

httpServer.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `❌ Port ${PORT} is already in use. Stop the other process or set PORT in .env`
    );
    process.exit(1);
  }
  throw err;
});

startServer().catch((err) => {
  console.error("❌ Server failed to start:", err);
});
