import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getProducts);

// Protected Routes
router.get(
  "/my-products",
  authMiddleware,
  roleMiddleware("shopOwner"),
  getMyProducts
);

router.get("/:id", getProductById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("shopOwner"),
  upload.single("image"),
  addProduct
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("shopOwner"),
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("shopOwner"),
  deleteProduct
);

export default router;