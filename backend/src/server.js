import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import supabase from "./config/supabase.js";

import adminRoutes from "./routes/admin.js";
import adminProductRoutes from "./routes/adminProducts.js";
import adminCategoryRoutes from "./routes/adminCategories.js";
import adminOrderRoutes from "./routes/adminOrders.js";
import addressRoutes from "./routes/addresses.js";

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin:
//       process.env.FRONTEND_URL ||
//       "http://localhost:3000",
//     credentials: true,
//   })
// );

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://sai-satvik-dairy-pwai.vercel.app",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(
          new Error(
            "Not allowed by CORS"
          )
        );
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Sai Satvik API is running",
  });
});

/* =========================
   CUSTOMER ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/admin/orders",
  adminOrderRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/addresses",
  addressRoutes
);

/* =========================
   ADMIN ROUTES
========================= */

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/admin/products",
  adminProductRoutes
);

app.use(
  "/api/admin/categories",
  adminCategoryRoutes
);

/* =========================
   PRODUCT IMAGE STORAGE
========================= */

async function ensureProductImagesBucket() {
  const bucketName =
    "product-images";

  try {
    const {
      data: buckets,
      error: listError,
    } =
      await supabase.storage.listBuckets();

    if (listError) {
      throw listError;
    }

    const bucketExists =
      buckets?.some(
        (bucket) =>
          bucket.name ===
          bucketName
      );

    if (!bucketExists) {
      const {
        error: createError,
      } =
        await supabase.storage.createBucket(
          bucketName,
          {
            public: true,
          }
        );

      if (createError) {
        throw createError;
      }

      console.log(
        "Created Supabase Storage bucket: product-images"
      );
    } else {
      console.log(
        "Supabase Storage bucket ready: product-images"
      );
    }
  } catch (error) {
    console.error(
      "Supabase Storage bucket setup error:",
      error
    );

    throw error;
  }
}

/* =========================
   START SERVER
========================= */

async function startServer() {
  try {
    console.log(
      "Starting Sai Satvik backend..."
    );

    await ensureProductImagesBucket();

    app.listen(PORT, () => {
      console.log(
        `Sai Satvik API running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start backend:",
      error
    );

    process.exit(1);
  }
}

startServer();