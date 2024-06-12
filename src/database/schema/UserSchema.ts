import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  // firstName: {
  //   type: String,
  //   required: true,
  // },
  // lastName: {
  //   type: String,
  //   required: true,
  // },
  // emailAddress: {
  //   type: String,
  //   unique: true,
  // },
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
  },
  billingAddress: {
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
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  cartItems: [
    {
      product: { type: mongoose.Types.ObjectId },
      quantity: {
        type: Number,
      },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
