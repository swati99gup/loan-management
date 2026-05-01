import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  tenure: Number,
  interest: Number,
  totalRepayment: Number,
  status: {
    type: String,
    enum: ["APPLIED","SANCTIONED","DISBURSED","CLOSED","REJECTED"],
    default: "APPLIED"
  }
});

export default mongoose.model("Loan", loanSchema);