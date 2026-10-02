import supabase from "../config/supabase.js";

function normalizeAddressInput(body = {}) {
  return {
    type: body.type?.trim().toLowerCase() || "home",
    name: body.name?.trim() || "",
    phone: body.phone?.trim() || "",
    address: body.address?.trim() || "",
    city: body.city?.trim() || "",
    state: body.state?.trim() || "",
    pincode: body.pincode?.trim() || "",
    is_default: Boolean(body.isDefault),
  };
}

function validateAddress(address) {
  const allowedTypes = [
    "home",
    "work",
    "other",
  ];

  if (!allowedTypes.includes(address.type)) {
    return "Address type must be home, work, or other.";
  }

  if (!address.name) {
    return "Name is required.";
  }

  if (!address.phone) {
    return "Phone number is required.";
  }

  if (!address.address) {
    return "Address is required.";
  }

  if (!address.city) {
    return "City is required.";
  }

  if (!address.state) {
    return "State is required.";
  }

  if (!address.pincode) {
    return "Pincode is required.";
  }

  return null;
}

async function clearDefaultAddress(userId) {
  const {
    error,
  } = await supabase
    .from("addresses")
    .update({
      is_default: false,
    })
    .eq("user_id", userId)
    .eq("is_default", true);

  if (error) {
    throw error;
  }
}

async function getAddresses(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      data: addresses,
      error,
    } = await supabase
      .from("addresses")
      .select(
        `
        id,
        user_id,
        type,
        name,
        phone,
        address,
        city,
        state,
        pincode,
        is_default,
        created_at,
        updated_at
        `
      )
      .eq("user_id", userId)
      .order("is_default", {
        ascending: false,
      })
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Get addresses database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch addresses.",
      });
    }

    return res.json({
      success: true,
      addresses: addresses || [],
    });
  } catch (error) {
    console.error(
      "Get addresses error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch addresses.",
    });
  }
}

async function getAddressById(req, res) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Address ID is required.",
      });
    }

    const {
      data: address,
      error,
    } = await supabase
      .from("addresses")
      .select(
        `
        id,
        user_id,
        type,
        name,
        phone,
        address,
        city,
        state,
        pincode,
        is_default,
        created_at,
        updated_at
        `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error || !address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    return res.json({
      success: true,
      address,
    });
  } catch (error) {
    console.error(
      "Get address by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch address.",
    });
  }
}

async function createAddress(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const addressData =
      normalizeAddressInput(req.body);

    const validationError =
      validateAddress(addressData);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    if (addressData.is_default) {
      await clearDefaultAddress(userId);
    }

    const {
      data: address,
      error,
    } = await supabase
      .from("addresses")
      .insert({
        user_id: userId,
        type: addressData.type,
        name: addressData.name,
        phone: addressData.phone,
        address: addressData.address,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        is_default: addressData.is_default,
      })
      .select(
        `
        id,
        user_id,
        type,
        name,
        phone,
        address,
        city,
        state,
        pincode,
        is_default,
        created_at,
        updated_at
        `
      )
      .single();

    if (error) {
      console.error(
        "Create address database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to create address.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Address created successfully.",
      address,
    });
  } catch (error) {
    console.error(
      "Create address error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create address.",
    });
  }
}

async function updateAddress(req, res) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Address ID is required.",
      });
    }

    const addressData =
      normalizeAddressInput(req.body);

    const validationError =
      validateAddress(addressData);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const {
      data: existingAddress,
      error: existingError,
    } = await supabase
      .from("addresses")
      .select("id, is_default")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (existingError || !existingAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    if (addressData.is_default) {
      await clearDefaultAddress(userId);
    }

    const {
      data: address,
      error,
    } = await supabase
      .from("addresses")
      .update({
        type: addressData.type,
        name: addressData.name,
        phone: addressData.phone,
        address: addressData.address,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        is_default: addressData.is_default,
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select(
        `
        id,
        user_id,
        type,
        name,
        phone,
        address,
        city,
        state,
        pincode,
        is_default,
        created_at,
        updated_at
        `
      )
      .single();

    if (error) {
      console.error(
        "Update address database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to update address.",
      });
    }

    return res.json({
      success: true,
      message: "Address updated successfully.",
      address,
    });
  } catch (error) {
    console.error(
      "Update address error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update address.",
    });
  }
}

async function deleteAddress(req, res) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Address ID is required.",
      });
    }

    const {
      data: address,
      error: findError,
    } = await supabase
      .from("addresses")
      .select("id, is_default")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (findError || !address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    const {
      error: deleteError,
    } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (deleteError) {
      console.error(
        "Delete address database error:",
        deleteError
      );

      return res.status(500).json({
        success: false,
        message: "Failed to delete address.",
      });
    }

    if (address.is_default) {
      const {
        data: nextAddress,
        error: nextAddressError,
      } = await supabase
        .from("addresses")
        .select("id")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

      if (
        !nextAddressError &&
        nextAddress
      ) {
        await supabase
          .from("addresses")
          .update({
            is_default: true,
          })
          .eq(
            "id",
            nextAddress.id
          )
          .eq("user_id", userId);
      }
    }

    return res.json({
      success: true,
      message: "Address deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete address error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete address.",
    });
  }
}

async function setDefaultAddress(req, res) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Address ID is required.",
      });
    }

    const {
      data: address,
      error: findError,
    } = await supabase
      .from("addresses")
      .select("id")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (findError || !address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    await clearDefaultAddress(userId);

    const {
      data: updatedAddress,
      error,
    } = await supabase
      .from("addresses")
      .update({
        is_default: true,
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select(
        `
        id,
        user_id,
        type,
        name,
        phone,
        address,
        city,
        state,
        pincode,
        is_default,
        created_at,
        updated_at
        `
      )
      .single();

    if (error) {
      console.error(
        "Set default address database error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to set default address.",
      });
    }

    return res.json({
      success: true,
      message:
        "Default address updated successfully.",
      address: updatedAddress,
    });
  } catch (error) {
    console.error(
      "Set default address error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to set default address.",
    });
  }
}

export {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};