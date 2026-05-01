import Loan from "../models/Loan";
import { calculateLoan } from "../utils/loanCal";
import { Request, Response } from "express";

declare module 'express' {
  interface Request {
    user?: { id: string };
  }
}

interface LoanBody {
  amount: number;
  tenure: number;
}
export const applyLoan = async (req: Request, res: Response) => {
  const { amount, tenure } = req.body as LoanBody;

  const { interest, totalRepayment } = calculateLoan(amount, tenure);

  const loan = await Loan.create({
   userId: req.user!.id,
    amount,
    tenure,
    interest,
    totalRepayment: totalRepayment
  });

  res.json(loan);
};
export const approveLoan = async (req: Request, res: Response) => {
  const loan = await Loan.findByIdAndUpdate(
    req.params.id,
    { status: "SANCTIONED" },
    { new: true }
  );

  res.json(loan);
};
// controllers/loanController.ts
export const getLoans = async (_req: Request, res: Response) => {
  const loans = await Loan.find().populate("userId", "name email");
  res.json(loans);
};
export const getMyLoans = async (req: Request, res: Response) => {
  const loans = await Loan.find({ userId: req.user!.id });
  res.json(loans);
};
export const rejectLoan = async (req: Request, res: Response) => {
  const loan = await Loan.findByIdAndUpdate(
    req.params.id,
    { status: "REJECTED" },
    { new: true }
  );

  res.json(loan);
};
