
import express from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  placeOrder,
  getMyOrders,
  getShopOrders,
  updateOrderStatus,
  getShopDashboard,
} from "../controllers/orderController.js";

const router = express.Router();

// Customer places an order
router.post("/", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get(
  "/shop-orders",
  authMiddleware,
  roleMiddleware("shopOwner"),
  getShopOrders
);
router.get(
  "/shop-dashboard",
  authMiddleware,
  roleMiddleware("shopOwner"),
  getShopDashboard
);
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("shopOwner"),
  updateOrderStatus
);

export default router;