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
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Types.ObjectId,
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
