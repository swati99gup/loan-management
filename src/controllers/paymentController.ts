import { Request, Response } from "express";
import Loan from "../models/Loan";
import Payment from "../models/payment";

export const addPayment = async (req: Request, res: Response) => {
  const { loanId, amount, utr } = req.body;

  const exists = await Payment.findOne({ utr });
  if (exists) return res.status(400).json({ msg: "Duplicate UTR" });

  await Payment.create({ loanId, amount, utr, date: new Date() });

  const payments = await Payment.find({ loanId });
const totalPaid = payments.reduce((a, p) => a + (p.amount || 0), 0);
  const loan = await Loan.findById(loanId);

if (loan && loan.totalRepayment && totalPaid >= loan.totalRepayment) {
        loan.status = "CLOSED";
    await loan.save();
  }

  res.json({ msg: "Payment added" });
};