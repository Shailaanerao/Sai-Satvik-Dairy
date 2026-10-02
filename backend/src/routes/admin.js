import express from "express";

import {
  requireAuth,
  requireAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/check",
  requireAuth,
  requireAdmin,
  (req, res) => {
    return res.json({
      success: true,
      message: "Admin access verified",
      userId: req.user.id,
      role: req.userRole,
    });
  }
);

export default router;