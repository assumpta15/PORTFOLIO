
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

import adminProjectRoutes from "./routes/adminProjectRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";


import adminRoutes from "./routes/adminRoutes.js";




dotenv.config();

const app = express();

// Middleware
app.use(express.json());



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://your-client.vercel.app",
      "https://your-admin.vercel.app",
    ],
    credentials: true,
  })
);


// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes


app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://YOUR-CLIENT.vercel.app",
      "https://YOUR-ADMIN.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorHandler);

app.use("/api/admin/projects", adminProjectRoutes); 

app.use("/api/contact", contactRoutes);

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
