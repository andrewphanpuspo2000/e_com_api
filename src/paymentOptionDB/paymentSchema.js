import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "inActive",
    },
    option: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("paymentMethod", paymentSchema);
