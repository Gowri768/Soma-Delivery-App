import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if customer has purchased this product
    const order = await Order.findOne({
      customer: req.user.id,
      status: "Delivered",
      "items.product": productId,
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message:
          "You can review only delivered products that you purchased.",
      });
    }

    // Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      customer: req.user.id,
      product: productId,
      order: order._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    const product = await Product.findById(productId);

    const review = await Review.create({
      customer: req.user.id,
      product: productId,
      shop: product.shopOwner,
      order: order._id,
      rating,
      comment,
    });

    // Update product rating
    const reviews = await Review.find({
      product: productId,
    });

    product.numReviews = reviews.length;

    product.rating =
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};