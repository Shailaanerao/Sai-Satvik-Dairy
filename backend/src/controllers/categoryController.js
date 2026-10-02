import supabase from "../config/supabase.js";

async function getCategories(req, res) {
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
      .eq("is_active", true)
      .order("id", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Get categories database error:",
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
      "Get categories error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
}

export {
  getCategories,
};