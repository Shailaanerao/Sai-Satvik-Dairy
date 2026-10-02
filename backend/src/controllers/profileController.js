import supabase from "../config/supabase.js";

function publicProfile(profile, authUser) {
  return {
    id: profile.id,
    firstName: profile.first_name || "",
    lastName: profile.last_name || "",
    mobile: profile.mobile || "",
    email: authUser?.email || "",
    isVerified: Boolean(authUser?.email_confirmed_at),
    role: profile.role || "customer",
  };
}

async function getProfile(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select(
        "id, first_name, last_name, mobile, role"
      )
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error(
        "Get profile database error:",
        profileError
      );

      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.json({
      success: true,
      profile: publicProfile(profile, req.user),
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      firstName,
      lastName,
      mobile,
    } = req.body;

    const updates = {};

    if (firstName !== undefined) {
      updates.first_name = firstName.trim();
    }

    if (lastName !== undefined) {
      updates.last_name = lastName.trim();
    }

    if (mobile !== undefined) {
      updates.mobile = mobile.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No profile changes provided",
      });
    }

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select(
        "id, first_name, last_name, mobile, role"
      )
      .single();

    if (profileError) {
      console.error(
        "Update profile database error:",
        profileError
      );

      return res.status(500).json({
        success: false,
        message: "Failed to update profile",
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      profile: publicProfile(profile, req.user),
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
}

async function updateAddress(req, res) {
  return res.status(501).json({
    success: false,
    message: "Address management will be implemented next",
  });
}

export {
  getProfile,
  updateProfile,
  updateAddress,
};