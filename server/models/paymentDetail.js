import mongoose from "mongoose";

const PaymentDetailSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    amount: Number,
  },
  { timestamps: true }
);

const PaymentDetail = mongoose.model("PaymentDetail", PaymentDetailSchema);

export default PaymentDetail;
