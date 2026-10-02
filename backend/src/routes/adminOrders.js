import express from "express";

import {
  requireAuth,
  requireAdmin,
} from "../middleware/auth.js";

import {
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrderStatus,
  updateAdminPaymentStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  requireAdmin,
  getAdminOrders
);

router.get(
  "/:id",
  requireAuth,
  requireAdmin,
  getAdminOrderById
);

router.patch(
  "/:id/status",
  requireAuth,
  requireAdmin,
  updateAdminOrderStatus
);

router.patch(
  "/:id/payment-status",
  requireAuth,
  requireAdmin,
  updateAdminPaymentStatus
);

export default router;