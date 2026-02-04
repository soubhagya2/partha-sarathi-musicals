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
