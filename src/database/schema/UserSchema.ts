import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: { type: String, required: false },
  emailAddress: { type: String, required: false },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  cartItems: [
    {
      basePrice: {
        type: Number,
      },
      variantId: {
        type: Number,
      },
      additionalCost: {
        type: Number,
      },
      images: [
        {
          type: String,
        },
      ],
      quantity: {
        type: Number,
      },
      itemQuantity: {
        type: Number,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      category: {
        type: String,
      },
      title: {
        type: String,
      },
      variantName: {
        type: String,
      },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
