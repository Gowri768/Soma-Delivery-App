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
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        shopOwner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],

    address: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      house: {
        type: String,
        required: true,
      },

      village: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },

      landmark: {
        type: String,
        default: "",
      },
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      required: true,
      default: 20,
    },

    total: {
      type: Number,
      required: true,
    },

    // ==============================
    // PAYMENT
    // ==============================

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // ==============================
    // ORDER STATUS
    // ==============================

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

const Order = mongoose.model("Order", orderSchema);

export default Order;