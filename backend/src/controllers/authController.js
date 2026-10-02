import supabase from "../config/supabase.js";

export async function register(req, res) {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      mobile,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const {
      data,
      error,
    } = await supabase.auth.admin.createUser({
      email: email.trim(),
      password,
      email_confirm: false,
      user_metadata: {
        first_name: first_name?.trim() || "",
        last_name: last_name?.trim() || "",
        mobile: mobile?.trim() || "",
      },
    });

    if (error) {
      console.error(
        "Supabase registration error:",
        error
      );

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (error) {
    console.error(
      "Registration controller error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
}

export async function login(req, res) {
  return res.status(410).json({
    success: false,
    message:
      "Backend login is no longer used. Login is handled by Supabase Auth.",
  });
}

export async function logout(req, res) {
  return res.json({
    success: true,
    message:
      "Logout is handled by Supabase Auth on the frontend.",
  });
}

export async function getCurrentUser(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(
      "Get current user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch current user.",
    });
  }
}