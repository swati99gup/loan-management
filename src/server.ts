import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import loanRoutes from "./routes/loanRoutes";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
  origin: "*", // for now (later restrict)
}));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/loan", loanRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      tls: true, // ✅ FIX SSL ISSUE
    });

    console.log("✅ DB connected");

    const PORT = process.env.PORT || 5000;

    app.get("/", (_req, res) => {
      res.json({ message: "Welcome to the API" });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log("❌ DB connection error:", err);
  }
};

startServer();