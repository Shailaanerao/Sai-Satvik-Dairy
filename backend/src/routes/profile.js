import express from "express";

import {
  getProfile,
  updateProfile,
  updateAddress,
} from "../controllers/profileController.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, updateProfile);
router.put(
  "/address",
  requireAuth,
  updateAddress
);

export default router;