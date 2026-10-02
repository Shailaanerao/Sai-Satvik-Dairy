import supabase from "../config/supabase.js";

async function getProducts(req, res) {
  try {
    const {
      category,
      featured,
      search,
    } = req.query;

    let query = supabase
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
        categories!inner (
          id,
          name,
          slug
        )
      `)
      .eq("is_active", true)
      .order("created_at", {
        ascending: false,
      });

    if (category) {
      query = query.eq(
        "categories.slug",
        category
      );
    }

    if (featured === "true") {
      query = query.eq(
        "featured",
        true
      );
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const {
      data,
      error,
    } = await query;

    if (error) {
      console.error(
        "Get products database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }

    return res.json({
      success: true,
      products: data || [],
    });
  } catch (error) {
    console.error(
      "Get products error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const {
      data: product,
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
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error || !product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "Get product by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
}

export {
  getProducts,
  getProductById,
};