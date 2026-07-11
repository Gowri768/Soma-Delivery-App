import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
    },

    shopOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);