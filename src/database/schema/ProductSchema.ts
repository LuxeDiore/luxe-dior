import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  ratings: [
    {
      value: { type: Number },
      user: { type: mongoose.Types.ObjectId },
    },
  ],
  reviews: [
    {
      review: { type: String },
      user: { type: mongoose.Types.ObjectId },
    },
  ],
  category: {
    type: String,
    required: true,
  },

  variantsCount: {
    type: Number,
    required: true,
  },
  variants: [
    {
      name: {
        type: String,
      },
      images: [{ type: String }],
    },
  ],
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
