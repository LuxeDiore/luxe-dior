import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  orderValue: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
      },
      variant: {
        name: String,
        images: [{ type: String }],
        additionalCost: {
          type: Number,
        },
      },
      quantity: {
        type: Number,
      },
      productPrice: {
        type: Number,
      },
    },
  ],
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
