import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["ADMIN","SALES","SANCTION","DISBURSEMENT","COLLECTION","BORROWER"],
    default: "BORROWER"
  }
});

export default mongoose.model("User", userSchema);