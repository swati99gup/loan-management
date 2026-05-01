import express from "express";
import { applyLoan, approveLoan ,getLoans,getMyLoans} from "../controllers/loanController";
import { auth } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import { rejectLoan } from "../controllers/loanController";
const router = express.Router();

router.post("/apply", auth, applyLoan);
router.post("/approve/:id", auth, authorize("SANCTION"), approveLoan);
router.get("/loans", auth, getLoans);
router.get("/my-loans", auth, getMyLoans);
router.post("/reject/:id", auth, authorize("SANCTION"), rejectLoan);

export default router;
