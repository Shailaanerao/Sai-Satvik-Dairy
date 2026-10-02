import supabase from "../config/supabase.js";

async function getAdminCategories(req, res) {
  try {
    const {
      data,
      error,
    } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        slug,
        description,
        image_url,
        is_active,
        created_at,
        updated_at
      `)
      .order("id", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Get admin categories database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories",
      });
    }

    return res.json({
      success: true,
      categories: data || [],
    });
  } catch (error) {
    console.error(
      "Get admin categories error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
}

async function createAdminCategory(req, res) {
  try {
    const {
      name,
      slug,
      description,
      imageUrl,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (!slug?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category slug is required",
      });
    }

    const {
      data: existingCategory,
      error: existingError,
    } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug.trim())
      .maybeSingle();

    if (existingError) {
      console.error(
        "Check category slug error:",
        existingError
      );

      return res.status(500).json({
        success: false,
        message: "Failed to validate category slug",
      });
    }

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message:
          "A category with this slug already exists",
      });
    }

    const {
      data: category,
      error,
    } = await supabase
      .from("categories")
      .insert({
        name: name.trim(),
        slug: slug.trim(),
        description:
          description?.trim() || null,
        image_url:
          imageUrl?.trim() || null,
        is_active: true,
      })
      .select(`
        id,
        name,
        slug,
        description,
        image_url,
        is_active,
        created_at,
        updated_at
      `)
      .single();

    if (error) {
      console.error(
        "Create category database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to create category",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(
      "Create admin category error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
}

async function updateAdminCategory(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      slug,
      description,
      imageUrl,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (!slug?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category slug is required",
      });
    }

    const {
      data: existingCategory,
      error: existingError,
    } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug.trim())
      .neq("id", id)
      .maybeSingle();

    if (existingError) {
      console.error(
        "Check category slug error:",
        existingError
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to validate category slug",
      });
    }

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message:
          "Another category with this slug already exists",
      });
    }

    const {
      data: category,
      error,
    } = await supabase
      .from("categories")
      .update({
        name: name.trim(),
        slug: slug.trim(),
        description:
          description?.trim() || null,
        image_url:
          imageUrl?.trim() || null,
      })
      .eq("id", id)
      .select(`
        id,
        name,
        slug,
        description,
        image_url,
        is_active,
        created_at,
        updated_at
      `)
      .single();

    if (error) {
      console.error(
        "Update category database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to update category",
      });
    }

    return res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(
      "Update admin category error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
}

async function updateCategoryStatus(req, res) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be true or false",
      });
    }

    const {
      data: category,
      error,
    } = await supabase
      .from("categories")
      .update({
        is_active: isActive,
      })
      .eq("id", id)
      .select(`
        id,
        name,
        slug,
        description,
        image_url,
        is_active,
        created_at,
        updated_at
      `)
      .single();

    if (error) {
      console.error(
        "Update category status database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update category status",
      });
    }

    return res.json({
      success: true,
      message:
        "Category status updated successfully",
      category,
    });
  } catch (error) {
    console.error(
      "Update category status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update category status",
    });
  }
}

async function deleteAdminCategory(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const {
      data: category,
      error: categoryError,
    } = await supabase
      .from("categories")
      .select("id, name")
      .eq("id", id)
      .maybeSingle();

    if (categoryError) {
      console.error(
        "Find category before delete error:",
        categoryError
      );

      return res.status(500).json({
        success: false,
        message: "Failed to find category",
      });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const {
      data: products,
      error: productsError,
    } = await supabase
      .from("products")
      .select("id")
      .eq("category_id", id)
      .limit(1);

    if (productsError) {
      console.error(
        "Check category products error:",
        productsError
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to check products using this category",
      });
    }

    if (products?.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This category cannot be deleted because products are assigned to it. Deactivate it instead.",
      });
    }

    const {
      error: deleteError,
    } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(
        "Delete category database error:",
        deleteError
      );

      return res.status(500).json({
        success: false,
        message: "Failed to delete category",
      });
    }

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete admin category error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
}

export {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  updateCategoryStatus,
  deleteAdminCategory,
};