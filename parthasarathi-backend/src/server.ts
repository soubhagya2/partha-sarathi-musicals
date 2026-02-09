/**
 * Express Server with Custom JWT Authentication
 * Replaces Clerk with bcryptjs + JWT + custom auth flow
 */

import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";
import connectDB from "./config/db";
import routes from "./routes/index";
import { logger } from "./utils/logger";
import { generalLimiter } from "./middleware/rateLimiter.middleware";

dotenv.config({ quiet: true });

const app: Express = express();
const httpServer = createServer(app);

/**
 * ----- Security & Parsing Middleware -----
 */

// Helmet for security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    // Prefer an explicitly set CORS_ORIGIN, otherwise use FRONTEND_URL or default to Vite dev server
    origin:
      process.env.CORS_ORIGIN ||
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// JSON parsing with size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Cookie parser for refresh tokens
app.use(cookieParser());

// HTTP request logging
app.use(morgan("dev"));

// Rate limiting middleware (apply after logging, before routes)
app.use(generalLimiter);

/**
 * ----- API Routes -----
 */

// Health check endpoint (no auth required)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API test route (no auth required)
app.get("/api-test", (req, res) => {
  res.json({
    message: "API test route works!",
    timestamp: new Date().toISOString(),
    auth: "JWT-based custom authentication",
  });
});

// Main API routes
app.use("/api", routes);

/**
 * ----- 404 Handler -----
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.path,
    method: req.method,
    code: "NOT_FOUND",
  });
});

/**
 * ----- Error Handler -----
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled error", {
    error: err.message,
    stack: err.stack,
    path: req.path,
  });

  res.status(500).json({
    success: false,
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An unexpected error occurred",
    code: "INTERNAL_ERROR",
  });
});

/**
 * ----- Start Server -----
 */
const PORT = process.env.PORT || 5000;

async function startServer(): Promise<void> {
  try {
    /**
     * MongoDB Connection
     */
    logger.info("Connecting to MongoDB...");
    await connectDB();
    logger.info("✅ MongoDB connected");

    /**
     * Socket.IO Setup
     */
    logger.info("Setting up Socket.IO with MongoDB adapter...");
    const mongoClient = new MongoClient(process.env.MONGODB_URI!);
    await mongoClient.connect();

    const mongoCollection = mongoClient
      .db(process.env.MONGODB_DB_NAME || "parthasarathi")
      .collection("socket.io-adapter");

    const io = new SocketIOServer(httpServer, {
      cors: {
        origin:
          process.env.CORS_ORIGIN ||
          process.env.FRONTEND_URL ||
          "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],
      },
    });

    io.adapter(createAdapter(mongoCollection));
    logger.info("✅ Socket.IO adapter connected to MongoDB");

    /**
     * Create Super Admin if needed
     */
    const { ensureSuperAdminExists } =
      await import("./services/authService.js");
    logger.info("Ensuring SUPER_ADMIN exists...");
    await ensureSuperAdminExists();
    logger.info("✅ SUPER_ADMIN verification complete");

    /**
     * Start HTTP Server
     */
    httpServer.listen(PORT, () => {
      console.log("\n");
      console.log("╔═════════════════════════════════════════════════╗");
      console.log("║  Parthasarathi Musicals Backend Server         ║");
      console.log("║  Authentication: JWT-based Custom Auth Stack    ║");
      console.log("╚═════════════════════════════════════════════════╝");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}/api`);
      console.log(`🔐 Auth: JWT (bcryptjs + jsonwebtoken)`);
      console.log(`📧 Email: ${process.env.EMAIL_PROVIDER || "console"}`);
      console.log(
        `📊 WebSocket: Connected to MongoDB (socket.io-adapter collection)`,
      );
      console.log(
        `🌍 CORS: ${process.env.CORS_ORIGIN || "http://localhost:3000"}`,
      );
      console.log(`📋 Env: ${process.env.NODE_ENV || "development"}`);
      console.log("\n");
      logger.info("Server started successfully");
    });
  } catch (error) {
    logger.error("Failed to start server", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    process.exit(1);
  }
}

/**
 * ----- Graceful Shutdown -----
 */
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  httpServer.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down gracefully...");
  httpServer.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

// Start the server
startServer().catch((err) => {
  logger.error("Fatal startup error", {
    error: err instanceof Error ? err.message : "Unknown error",
  });
  process.exit(1);
});

export default app;
