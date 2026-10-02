import express from "express";

import {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";

import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  getAddresses
);

router.get(
  "/:id",
  requireAuth,
  getAddressById
);

router.post(
  "/",
  requireAuth,
  createAddress
);

router.put(
  "/:id",
  requireAuth,
  updateAddress
);

router.delete(
  "/:id",
  requireAuth,
  deleteAddress
);

router.patch(
  "/:id/default",
  requireAuth,
  setDefaultAddress
);

export default router;