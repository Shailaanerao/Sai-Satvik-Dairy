import supabase from "../config/supabase.js";

async function getAdminProducts(req, res) {
  try {
    const {
      data: products,
      error,
    } = await supabase
      .from("products")
      .select(`
        id,
        category_id,
        name,
        slug,
        description,
        long_description,
        price,
        old_price,
        unit,
        image_url,
        images,
        stock_quantity,
        is_active,
        featured,
        rating,
        review_count,
        created_at,
        updated_at,
        categories (
          id,
          name,
          slug
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Admin get products database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }

    return res.json({
      success: true,
      products: products || [],
    });
  } catch (error) {
    console.error(
      "Admin get products error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
}

async function createAdminProduct(req, res) {
  try {
    const {
      categoryId,
      name,
      slug,
      description,
      longDescription,
      price,
      oldPrice,
      unit,
      imageUrl,
      images,
      stockQuantity,
      isActive,
      featured,
    } = req.body;

    if (
      !name?.trim() ||
      !slug?.trim() ||
      price === undefined ||
      !unit?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, slug, price and unit are required",
      });
    }

    const productData = {
      category_id:
        categoryId || null,

      name: name.trim(),

      slug: slug.trim(),

      description:
        description?.trim() || null,

      long_description:
        longDescription?.trim() || null,

      price: Number(price),

      old_price:
        oldPrice === undefined ||
        oldPrice === null ||
        oldPrice === ""
          ? null
          : Number(oldPrice),

      unit: unit.trim(),

      image_url:
        imageUrl?.trim() || null,

      images:
        Array.isArray(images)
          ? images
          : [],

      stock_quantity:
        stockQuantity === undefined
          ? 0
          : Number(stockQuantity),

      is_active:
        isActive === undefined
          ? true
          : Boolean(isActive),

      featured:
        featured === undefined
          ? false
          : Boolean(featured),
    };

    if (
      !Number.isFinite(productData.price) ||
      productData.price < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product price",
      });
    }

    if (
      !Number.isInteger(
        productData.stock_quantity
      ) ||
      productData.stock_quantity < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid stock quantity",
      });
    }

    if (
      productData.old_price !== null &&
      (!Number.isFinite(
        productData.old_price
      ) ||
        productData.old_price < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid old price",
      });
    }

    const {
      data: product,
      error,
    } = await supabase
      .from("products")
      .insert(productData)
      .select(`
        id,
        category_id,
        name,
        slug,
        description,
        long_description,
        price,
        old_price,
        unit,
        image_url,
        images,
        stock_quantity,
        is_active,
        featured,
        rating,
        review_count,
        created_at,
        updated_at,
        categories (
          id,
          name,
          slug
        )
      `)
      .single();

    if (error) {
      console.error(
        "Admin create product database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to create product",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(
      "Admin create product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
}

async function updateAdminProduct(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const {
      categoryId,
      name,
      slug,
      description,
      longDescription,
      price,
      oldPrice,
      unit,
      imageUrl,
      images,
      stockQuantity,
      isActive,
      featured,
    } = req.body;

    const updates = {};

    if (categoryId !== undefined) {
      updates.category_id =
        categoryId || null;
    }

    if (name !== undefined) {
      updates.name = name.trim();
    }

    if (slug !== undefined) {
      updates.slug = slug.trim();
    }

    if (description !== undefined) {
      updates.description =
        description.trim();
    }

    if (longDescription !== undefined) {
      updates.long_description =
        longDescription.trim();
    }

    if (price !== undefined) {
      updates.price = Number(price);
    }

    if (oldPrice !== undefined) {
      updates.old_price =
        oldPrice === null ||
        oldPrice === ""
          ? null
          : Number(oldPrice);
    }

    if (unit !== undefined) {
      updates.unit = unit.trim();
    }

    if (imageUrl !== undefined) {
      updates.image_url =
        imageUrl.trim();
    }

    if (images !== undefined) {
      updates.images = Array.isArray(images)
        ? images
        : [];
    }

    if (stockQuantity !== undefined) {
      updates.stock_quantity =
        Number(stockQuantity);
    }

    if (isActive !== undefined) {
      updates.is_active =
        Boolean(isActive);
    }

    if (featured !== undefined) {
      updates.featured =
        Boolean(featured);
    }

    if (updates.price !== undefined) {
      if (
        !Number.isFinite(updates.price) ||
        updates.price < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product price",
        });
      }
    }

    if (
      updates.old_price !== undefined &&
      updates.old_price !== null &&
      (!Number.isFinite(
        updates.old_price
      ) ||
        updates.old_price < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid old price",
      });
    }

    if (
      updates.stock_quantity !== undefined &&
      (!Number.isInteger(
        updates.stock_quantity
      ) ||
        updates.stock_quantity < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid stock quantity",
      });
    }

    if (
      Object.keys(updates).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No product changes provided",
      });
    }

    const {
      data: product,
      error,
    } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select(`
        id,
        category_id,
        name,
        slug,
        description,
        long_description,
        price,
        old_price,
        unit,
        image_url,
        images,
        stock_quantity,
        is_active,
        featured,
        rating,
        review_count,
        created_at,
        updated_at,
        categories (
          id,
          name,
          slug
        )
      `)
      .single();

    if (error || !product) {
      console.error(
        "Admin update product database error:",
        error
      );

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(
      "Admin update product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
}

/*
 * Activate or deactivate a product.
 *
 * This does not delete the product.
 * It only changes products.is_active.
 *
 * isActive: true  -> product is active
 * isActive: false -> product is inactive
 */
async function updateProductStatus(req, res) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be true or false",
      });
    }

    const {
      data: product,
      error,
    } = await supabase
      .from("products")
      .update({
        is_active: isActive,
      })
      .eq("id", id)
      .select(`
        id,
        category_id,
        name,
        slug,
        description,
        long_description,
        price,
        old_price,
        unit,
        image_url,
        images,
        stock_quantity,
        is_active,
        featured,
        rating,
        review_count,
        created_at,
        updated_at,
        categories (
          id,
          name,
          slug
        )
      `)
      .single();

    if (error || !product) {
      console.error(
        "Admin update product status database error:",
        error
      );

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: isActive
        ? "Product activated successfully"
        : "Product deactivated successfully",
      product,
    });
  } catch (error) {
    console.error(
      "Admin update product status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update product status",
    });
  }
}

async function deleteAdminProduct(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    /*
     * We use a soft delete instead of physically
     * deleting the product. This protects existing
     * order history that may reference the product.
     */
    const {
      data: product,
      error,
    } = await supabase
      .from("products")
      .update({
        is_active: false,
      })
      .eq("id", id)
      .select(`
        id,
        name,
        is_active
      `)
      .single();

    if (error || !product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message:
        "Product deactivated successfully",
      product,
    });
  } catch (error) {
    console.error(
      "Admin delete product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to deactivate product",
    });
  }
}

export {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  updateProductStatus,
};