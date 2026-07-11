import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryPartner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

    items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    quantity: Number,

    shopOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
],

    address: {
      fullName: String,
      phone: String,
      house: String,
      village: String,
      pincode: String,
    },

    subtotal: Number,

    deliveryCharge: Number,

    total: Number,

    status: {
      type: String,
      enum: [
  "Pending",
  "Accepted",
  "Rejected",
  "Preparing",
  "Out for Delivery",
  "Delivered",
],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);