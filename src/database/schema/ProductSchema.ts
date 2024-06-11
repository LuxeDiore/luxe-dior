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
  averageRating: {
    type: Number,
  },
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  productSold: {
    type: Number,
    default: 0,
  },
  variants: [
    {
      name: {
        type: String,
      },
      images: [{ type: String }],
      additionalCost: {
        type: Number,
      },
    },
  ],
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
