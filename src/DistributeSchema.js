
 
import mongoose from "mongoose";

const DistributionAgreementSchema = new mongoose.Schema(
  {
    legalName: { type: String, required: true },
    stageName: { type: String, required: true },
    email: { type: String, required: true },
    address: String,
    phone: String,
    trackTitle: { type: String, required: true },
    uploadLink: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["bank", "paypal", "crypto"],
      required: true,
    },
    wallet: String,
    ownership: { type: Boolean, required: true },
    signature: { type: String, required: true },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "DistributionAgreement",
  DistributionAgreementSchema
);