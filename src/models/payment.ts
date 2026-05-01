import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan" },
  amount: Number,
  utr: { type: String, unique: true },
  date: Date
});

export default mongoose.model("Payment", paymentSchema);