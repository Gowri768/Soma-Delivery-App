import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/update", authMiddleware, updateCartQuantity);
router.delete("/remove", authMiddleware, removeFromCart);
export default router;