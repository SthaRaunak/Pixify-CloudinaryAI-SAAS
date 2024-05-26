import mongoose, { Schema, models } from "mongoose";

const transactionSchma = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  credits: {
    type: Number,
  },
});

const Transaction =
  models?.Transaction || mongoose.model("Transaction", transactionSchma);

export default Transaction;
