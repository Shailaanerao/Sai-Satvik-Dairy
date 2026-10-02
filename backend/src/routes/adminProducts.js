import express from "express";
import multer from "multer";

import {
  requireAuth,
  requireAdmin,
} from "../middleware/auth.js";

import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  updateProductStatus,
} from "../controllers/adminProductController.js";

import {
  uploadProductImage,
} from "../controllers/adminProductImageController.js";

const router = express.Router();

/*
 * Multer configuration.
 *
 * Images are kept in memory temporarily and
 * then uploaded to Supabase Storage.
 */
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (
    req,
    file,
    callback
  ) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      callback(null, true);
      return;
    }

    callback(
      new Error(
        "Only JPG, PNG, WebP and AVIF images are allowed"
      )
    );
  },
});

/*
 * Check whether the logged-in user
 * has admin access.
 */
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

/*
 * Upload product image.
 *
 * Request type:
 * multipart/form-data
 *
 * File field:
 * image
 */
router.post(
  "/upload-image",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  uploadProductImage
);

/*
 * Get all products for Admin.
 *
 * Includes active and inactive products.
 */
router.get(
  "/",
  requireAuth,
  requireAdmin,
  getAdminProducts
);

/*
 * Create a new product.
 */
router.post(
  "/",
  requireAuth,
  requireAdmin,
  createAdminProduct
);

/*
 * Activate or deactivate a product.
 *
 * Body:
 * {
 *   "isActive": true
 * }
 *
 * or:
 *
 * {
 *   "isActive": false
 * }
 */
router.patch(
  "/:id/status",
  requireAuth,
  requireAdmin,
  updateProductStatus
);

/*
 * Update an existing product.
 */
router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  updateAdminProduct
);

/*
 * Soft-delete/deactivate a product.
 *
 * The product is NOT physically deleted.
 */
router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  deleteAdminProduct
);

export default router;