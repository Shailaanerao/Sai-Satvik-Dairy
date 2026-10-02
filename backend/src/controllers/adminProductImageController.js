import crypto from "crypto";
import path from "path";

import supabase from "../config/supabase.js";

const PRODUCT_IMAGES_BUCKET =
  "product-images";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

async function uploadProductImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    if (
      !ALLOWED_IMAGE_TYPES.has(
        req.file.mimetype
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only JPG, PNG, WebP and AVIF images are allowed",
      });
    }

    const extension =
      path.extname(
        req.file.originalname
      ) || ".jpg";

    const safeExtension =
      extension.toLowerCase();

    const fileName = `${Date.now()}-${crypto.randomUUID()}${safeExtension}`;

    const filePath = `products/${fileName}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(
        filePath,
        req.file.buffer,
        {
          contentType:
            req.file.mimetype,

          cacheControl:
            "31536000",

          upsert: false,
        }
      );

    if (uploadError) {
      console.error(
        "Product image upload error:",
        uploadError
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to upload product image",
      });
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(filePath);

    const imageUrl =
      publicUrlData?.publicUrl;

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message:
          "Image uploaded but public URL could not be created",
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Product image uploaded successfully",
      imageUrl,
      path: filePath,
    });
  } catch (error) {
    console.error(
      "Admin product image upload error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload product image",
    });
  }
}

export {
  uploadProductImage,
};