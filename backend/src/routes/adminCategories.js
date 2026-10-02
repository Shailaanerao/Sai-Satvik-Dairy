import express from "express";

import {
  requireAuth,
  requireAdmin,
} from "../middleware/auth.js";

import {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  updateCategoryStatus,
  deleteAdminCategory,
} from "../controllers/adminCategoryController.js";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  requireAdmin,
  getAdminCategories
);

router.post(
  "/",
  requireAuth,
  requireAdmin,
  createAdminCategory
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  updateAdminCategory
);

router.patch(
  "/:id/status",
  requireAuth,
  requireAdmin,
  updateCategoryStatus
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  deleteAdminCategory
);

export default router;