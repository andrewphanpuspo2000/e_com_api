import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "inActive",
    },
    role: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
