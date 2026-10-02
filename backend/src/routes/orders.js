import express from "express";

import {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  getOrderTracking,
} from "../controllers/orderController.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  getOrders
);

router.get(
  "/:id",
  requireAuth,
  getOrderById
);

router.post(
  "/",
  requireAuth,
  createOrder
);

router.patch(
  "/:id/cancel",
  requireAuth,
  cancelOrder
);

router.get(
  "/:id/tracking",
  requireAuth,
  getOrderTracking
);

export default router;