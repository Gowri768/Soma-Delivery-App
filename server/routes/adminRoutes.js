import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  
  getAdminDashboard,
  getAllUsers,
  getAllProducts,
  getAllOrders,
  getAllDeliveryPartners,
  updateUserRole,
  updateAdminOrderStatus,
  assignDeliveryPartner,
  getDeliveryPartnerApplications,
  updateDeliveryPartnerApplication,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminDashboard
);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);
router.get(
  "/products",
  authMiddleware,
  roleMiddleware("admin"),
  getAllProducts
);
router.get(
  "/orders",
  authMiddleware,
  roleMiddleware("admin"),
  getAllOrders
);
router.get(
  "/delivery-partners",
  authMiddleware,
  roleMiddleware("admin"),
  getAllDeliveryPartners
);
router.put(
  "/users/:userId/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);
router.put(
  "/orders/:orderId/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateAdminOrderStatus
);
router.put(
  "/orders/:orderId/delivery-partner",
  authMiddleware,
  roleMiddleware("admin"),
  assignDeliveryPartner
);
router.get(
  "/delivery-applications",
  authMiddleware,
  roleMiddleware("admin"),
  getDeliveryPartnerApplications
);

router.put(
  "/delivery-applications/:userId",
  authMiddleware,
  roleMiddleware("admin"),
  updateDeliveryPartnerApplication
);
export default router;
