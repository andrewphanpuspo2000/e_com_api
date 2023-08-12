import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "inActive",
    },
    name: {
      type: String,
      required: true,
      maxLength: 80,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      maxLength: 80,
    },
    qty: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    salesPrice: {
      type: Number,
      required: true,
    },
    salesStart: {
      type: Date,
      required: true,
    },
    salesEnd: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    parentCat: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
