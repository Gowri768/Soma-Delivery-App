import express from "express";

import {
  addReview,
  getProductReviews,
} from "../controllers/reviewController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer adds a review
router.post("/", authMiddleware, addReview);

// Get reviews for a product
router.get("/product/:productId", getProductReviews);

export default router;