import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  basePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productId: { type: mongoose.Types.ObjectId, ref: "Product" },
  variantId: { type: Number, required: true },
});
const orderSchema = new mongoose.Schema({
  user: {
    userName: { type: String, required: true },
    clerkId: { type: String, required: true },
  },
  deliveryCharge: { type: Number, required: true },
  shippingAddress: {
    addressline1: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
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
    required: false,
    default: "NOT CHOSEN YET",
  },
  paymentStatus: {
    type: String,
    required: false,
  },
  paymentId: {
    type: String,
    required: true,
  },
  items: {
    type: [itemSchema],
    required: true,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
