import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./src/routes/todoRoutes.js"; 

// Type-only imports
import type { Request, Response, NextFunction } from "express";

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB - we need this env var or we're dead in the water
const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  throw new Error("MONGODB_URL is not defined");
}

mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Wire up the todo routes
app.use("/todos", todoRoutes);

// Catch all errors - this middleware has to be last or it won't catch anything
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Fire it up
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));