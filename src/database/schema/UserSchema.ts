import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },

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
