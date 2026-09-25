import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  applyAsDeliveryPartner,
  getMyDeliveryApplication,
} from "../controllers/deliveryApplicationController.js";
const router = express.Router();

router.post(
  "/apply",
  authMiddleware,
  applyAsDeliveryPartner
);
router.get(
  "/my-status",
  authMiddleware,
  getMyDeliveryApplication
);
export default router;