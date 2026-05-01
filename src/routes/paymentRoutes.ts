import express from "express";
import { addPayment } from "../controllers/paymentController";
import { auth } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/add", auth, authorize("COLLECTION"), addPayment);

export default router;