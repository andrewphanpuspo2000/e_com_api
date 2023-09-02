import mongoose, { mongo } from "mongoose";

const categorySchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "inActive",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", categorySchema);
