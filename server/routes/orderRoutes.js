import express from "express";

import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  placeOrder,
  processMockPayment,
  getMyOrders,
  getShopOrders,
  updateOrderStatus,
  getShopDashboard,
  getDeliveryOrders,
  updateDeliveryStatus,
  getDeliveryEarnings,
  getDeliveryHistory,
} from "../controllers/orderController.js";

const router = express.Router();

// ==============================
// CUSTOMER
// ==============================

// Place COD / Online Order
router.post(
  "/",
  authMiddleware,
  placeOrder
);

// Get customer's orders
router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

// ==============================
// MOCK ONLINE PAYMENT
// ==============================

// Process mock online payment
router.post(
  "/payment/mock",
  authMiddleware,
  processMockPayment
);

// ==============================
// SHOP OWNER
// ==============================

// Get shop orders
router.get(
  "/shop-orders",
  authMiddleware,
  roleMiddleware("shopOwner"),
  getShopOrders
);

// Shop dashboard
router.get(
  "/shop-dashboard",
  authMiddleware,
  roleMiddleware("shopOwner"),
  getShopDashboard
);

// Update order status
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("shopOwner"),
  updateOrderStatus
);

// ==============================
// DELIVERY PARTNER
// ==============================

// Get assigned delivery orders
router.get(
  "/delivery-orders",
  authMiddleware,
  roleMiddleware("deliveryPartner"),
  getDeliveryOrders
);

// Update delivery status
router.put(
  "/:id/delivery-status",
  authMiddleware,
  roleMiddleware("deliveryPartner"),
  updateDeliveryStatus
);

// Delivery earnings
router.get(
  "/delivery-earnings",
  authMiddleware,
  roleMiddleware("deliveryPartner"),
  getDeliveryEarnings
);

// Delivery history
router.get(
  "/delivery-history",
  authMiddleware,
  roleMiddleware("deliveryPartner"),
  getDeliveryHistory
);

export default router;