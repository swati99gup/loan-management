import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ msg: "No token" });
    }

    // ✅ split "Bearer token"
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    (req as any).user = decoded;

    next();
  } catch (err) {
    console.log("Auth error:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};