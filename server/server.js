// =============================================
//  server.js — Application Entry Point
// =============================================
//
//  This file is the heart of our backend. It does four things:
//    1. Boots up an Express HTTP server
//    2. Attaches Socket.io for real-time communication
//    3. Connects to MongoDB via Mongoose
//    4. Registers all middleware and API routes
//
//  We keep this file thin on purpose — the actual business
//  logic lives in controllers/, data shapes in models/, and
//  endpoint mappings in routes/.  This is the MVC pattern.
// =============================================

// ---------- 1. Load Environment Variables ----------
// dotenv reads the .env file and injects values into process.env
// MUST be called before any other code that uses env vars.
import dotenv from "dotenv";
dotenv.config();

// ---------- 2. Core Imports ----------
import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

// ---------- 3. Internal Imports ----------
import connectDB from "./config/db.js";

// ---------- 4. Initialise Express & HTTP Server ----------
// Express handles REST API requests.
// We wrap it in an http.Server so Socket.io can share the
// same port — no need to run two separate processes.
const app = express();
const server = http.createServer(app);

// ---------- 5. Initialise Socket.io ----------
// Socket.io enables bi-directional, event-driven communication
// between the browser and server (used for the live interview room).
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ---------- 6. Global Middleware ----------
// cors()  → allows the React frontend to call our API
// json()  → parses incoming JSON request bodies
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// ---------- 7. Health-Check Route ----------
// A simple route to verify the server is alive.
// Visit GET /api/health to confirm.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ---------- 8. API Routes (mount here as you build them) ----------
// Example (uncomment when you create the route files):
// import userRoutes   from "./routes/user.routes.js";
// import roomRoutes   from "./routes/room.routes.js";
// app.use("/api/users", userRoutes);
// app.use("/api/rooms", roomRoutes);

// ---------- 9. Socket.io Connection Handler ----------
// This is where real-time events are managed.
// Each "io.on('connection')" fires when a client connects.
io.on("connection", (socket) => {
  console.log(`⚡ Socket connected: ${socket.id}`);

  // --- Example event listeners (expand per feature) ---
  // socket.on("join-room", (roomId) => { ... });
  // socket.on("code-change", (data) => { ... });
  // socket.on("disconnect", () => { ... });

  socket.on("disconnect", () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// ---------- 10. Start the Server ----------
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start listening.
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Socket.io ready on the same port`);
    console.log(`🏥 Health check → http://localhost:${PORT}/api/health\n`);
  });
});

// Export io so other modules can emit events
export { io };
