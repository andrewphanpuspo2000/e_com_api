import mongoose, { mongo } from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("category", categorySchema);
