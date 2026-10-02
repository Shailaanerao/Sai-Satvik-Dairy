"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import { supabase } from "@/lib/supabase";

import "./products.css";

const emptyForm = {
  categoryId: "",
  name: "",
  slug: "",
  description: "",
  longDescription: "",
  price: "",
  oldPrice: "",
  unit: "",
  imageUrl: "",
  stockQuantity: "0",
  isActive: true,
  featured: false,
};

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getProductImage(product) {
  return (
    product?.image_url ||
    product?.images?.[0] ||
    ""
  );
}

async function readResponse(response) {
  const contentType =
    response.headers.get("content-type") ||
    "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    return response.json();
  }

  const text = await response.text();

  return {
    message:
      text ||
      "Something went wrong.",
  };
}

export default function AdminProductsPage() {
  const router = useRouter();

  const fileInputRef = useRef(null);

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const [
    statusUpdatingId,
    setStatusUpdatingId,
  ] = useState(null);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    editingProductId,
    setEditingProductId,
  ] = useState(null);

  const [
    form,
    setForm,
  ] = useState(emptyForm);

  const [
    selectedImageFile,
    setSelectedImageFile,
  ] = useState(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadAdminData = async () => {
      try {
        setLoading(true);
        setError("");

        const {
          data: { session },
        } =
          await supabase.auth.getSession();

        if (!session?.access_token) {
          router.replace("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${session.access_token}`,
        };

        const [
          productsResponse,
          categoriesResponse,
        ] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/products`,
            {
              headers,
              cache: "no-store",
            }
          ),

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/categories`,
            {
              headers,
              cache: "no-store",
            }
          ),
        ]);

        const productsData =
          await readResponse(
            productsResponse
          );

        const categoriesData =
          await readResponse(
            categoriesResponse
          );

        if (!productsResponse.ok) {
          if (
            productsResponse.status ===
            403
          ) {
            router.replace("/home");
            return;
          }

          throw new Error(
            productsData?.message ||
              "Failed to load products."
          );
        }

        if (!categoriesResponse.ok) {
          throw new Error(
            categoriesData?.message ||
              "Failed to load categories."
          );
        }

        if (!mounted) {
          return;
        }

        setProducts(
          Array.isArray(
            productsData?.products
          )
            ? productsData.products
            : []
        );

        setCategories(
          Array.isArray(
            categoriesData?.categories
          )
            ? categoriesData.categories
            : []
        );
      } catch (requestError) {
        console.error(
          "Admin products error:",
          requestError
        );

        if (mounted) {
          setError(
            requestError?.message ||
              "Failed to load admin products."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(() => {
      loadAdminData();
    }, 0);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [router]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleNameChange = (event) => {
    const value =
      event.target.value;

    setForm((currentForm) => ({
      ...currentForm,
      name: value,
      slug: editingProductId
        ? currentForm.slug
        : createSlug(value),
    }));
  };

  const cleanupImagePreview = () => {
    if (
      imagePreview &&
      imagePreview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        imagePreview
      );
    }
  };

  const resetForm = () => {
    cleanupImagePreview();

    setForm({
      ...emptyForm,
    });

    setEditingProductId(null);
    setSelectedImageFile(null);
    setImagePreview("");
    setShowForm(false);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  const handleAddProduct = () => {
    cleanupImagePreview();

    setForm({
      ...emptyForm,
    });

    setEditingProductId(null);
    setSelectedImageFile(null);
    setImagePreview("");
    setShowForm(true);
    setError("");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEditProduct = (
    product
  ) => {
    const existingImage =
      getProductImage(product);

    cleanupImagePreview();

    setEditingProductId(product.id);

    setForm({
      categoryId:
        product.category_id
          ? String(
              product.category_id
            )
          : "",

      name:
        product.name || "",

      slug:
        product.slug || "",

      description:
        product.description || "",

      longDescription:
        product.long_description ||
        "",

      price:
        product.price ?? "",

      oldPrice:
        product.old_price ?? "",

      unit:
        product.unit || "",

      imageUrl:
        existingImage,

      stockQuantity:
        product.stock_quantity ?? 0,

      isActive:
        Boolean(
          product.is_active
        ),

      featured:
        Boolean(
          product.featured
        ),
    });

    setSelectedImageFile(null);
    setImagePreview(
      existingImage || ""
    );

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }

    setShowForm(true);
    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleImageSelect = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setMessage("");

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        file.type
      )
    ) {
      event.target.value = "";

      setSelectedImageFile(null);
      setImagePreview("");

      setError(
        "Please choose a JPG, PNG, WebP or AVIF image."
      );

      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      event.target.value = "";

      setSelectedImageFile(null);
      setImagePreview("");

      setError(
        "Image size must be 5 MB or smaller."
      );

      return;
    }

    cleanupImagePreview();

    const previewUrl =
      URL.createObjectURL(file);

    setSelectedImageFile(file);
    setImagePreview(previewUrl);
  };

  const removeSelectedImage = () => {
    cleanupImagePreview();

    setSelectedImageFile(null);
    setImagePreview("");

    setForm((currentForm) => ({
      ...currentForm,
      imageUrl: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  const uploadImage = async (
    file,
    accessToken
  ) => {
    setUploadingImage(true);

    try {
      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/upload-image`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },

          body: formData,
        }
      );

      const data =
        await readResponse(
          response
        );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to upload product image."
        );
      }

      if (!data?.imageUrl) {
        throw new Error(
          "Image uploaded but no image URL was returned."
        );
      }

      return data.imageUrl;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!session?.access_token) {
        router.replace("/login");
        return;
      }

      const isEditing =
        Boolean(editingProductId);

      let imageUrl =
        form.imageUrl.trim();

      /*
       * Upload a newly selected image
       * before creating/updating the product.
       */
      if (selectedImageFile) {
        imageUrl =
          await uploadImage(
            selectedImageFile,
            session.access_token
          );
      }

      const endpoint = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${editingProductId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/admin/products`;

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(
        endpoint,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            categoryId:
              form.categoryId
                ? Number(
                    form.categoryId
                  )
                : null,

            name:
              form.name.trim(),

            slug:
              form.slug.trim(),

            description:
              form.description.trim(),

            longDescription:
              form.longDescription.trim(),

            price:
              Number(form.price),

            oldPrice:
              form.oldPrice === ""
                ? null
                : Number(
                    form.oldPrice
                  ),

            unit:
              form.unit.trim(),

            imageUrl,

            images: imageUrl
              ? [imageUrl]
              : [],

            stockQuantity:
              Number(
                form.stockQuantity
              ),

            isActive:
              form.isActive,

            featured:
              form.featured,
          }),
        }
      );

      const data =
        await readResponse(
          response
        );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            (isEditing
              ? "Failed to update product."
              : "Failed to create product.")
        );
      }

      if (isEditing) {
        setProducts(
          (currentProducts) =>
            currentProducts.map(
              (product) =>
                product.id ===
                data.product.id
                  ? data.product
                  : product
            )
        );

        setMessage(
          "Product updated successfully."
        );
      } else {
        setProducts(
          (currentProducts) => [
            data.product,
            ...currentProducts,
          ]
        );

        setMessage(
          "Product created successfully."
        );
      }

      resetForm();
    } catch (requestError) {
      console.error(
        "Save product error:",
        requestError
      );

      setError(
        requestError?.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  const handleToggleStatus = async (
    product
  ) => {
    try {
      setStatusUpdatingId(
        product.id
      );

      setError("");
      setMessage("");

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      if (!session?.access_token) {
        router.replace("/login");
        return;
      }

      const nextStatus =
        !product.is_active;

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${product.id}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${session.access_token}`,
            },

            body: JSON.stringify({
              isActive:
                nextStatus,
            }),
          }
        );

      const data =
        await readResponse(
          response
        );

      if (!response.ok) {
        if (
          response.status === 403
        ) {
          router.replace("/home");
          return;
        }

        throw new Error(
          data?.message ||
            "Failed to update product status."
        );
      }

      setProducts(
        (currentProducts) =>
          currentProducts.map(
            (currentProduct) =>
              currentProduct.id ===
              data.product.id
                ? data.product
                : currentProduct
          )
      );

      setMessage(
        nextStatus
          ? "Product activated successfully."
          : "Product deactivated successfully."
      );
    } catch (requestError) {
      console.error(
        "Update product status error:",
        requestError
      );

      setError(
        requestError?.message ||
          "Failed to update product status."
      );
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const filteredProducts =
    products.filter((product) => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      if (!query) {
        return true;
      }

      const productName =
        product.name
          ?.toLowerCase() || "";

      const categoryName =
        product.categories?.name
          ?.toLowerCase() || "";

      return (
        productName.includes(
          query
        ) ||
        categoryName.includes(
          query
        )
      );
    });

  return (
    <section className="admin-products-page">
      <AdminPageHeader
        title="Products"
        description="Create, edit and manage the products available in your Sai Satvik store."
        action={
          <button
            type="button"
            className="products-add-button"
            onClick={
              handleAddProduct
            }
          >
            + Add Product
          </button>
        }
      />

      {error && (
        <div className="products-message products-message-error">
          <strong>Error</strong>
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="products-message products-message-success">
          <strong>Success</strong>
          <span>{message}</span>
        </div>
      )}

      {showForm && (
        <div className="product-form-card">
          <div className="product-form-header">
            <div>
              <span className="product-kicker">
                {editingProductId
                  ? "EDIT PRODUCT"
                  : "NEW PRODUCT"}
              </span>

              <h2>
                {editingProductId
                  ? "Edit Product"
                  : "Add Product"}
              </h2>

              <p>
                Add product information,
                pricing, stock and product
                imagery.
              </p>
            </div>

            <button
              type="button"
              className="product-close-button"
              onClick={
                resetForm
              }
            >
              ×
            </button>
          </div>

          <form
            className="product-form"
            onSubmit={
              handleSubmit
            }
          >
            <div className="product-form-grid">
              <div className="form-field form-field-full">
                <label htmlFor="categoryId">
                  Category
                </label>

                <select
                  id="categoryId"
                  name="categoryId"
                  value={
                    form.categoryId
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={
                          category.id
                        }
                        value={
                          category.id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="name">
                  Product Name
                </label>

                <input
                  id="name"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleNameChange
                  }
                  placeholder="Fresh A2 Cow Milk"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="slug">
                  Slug
                </label>

                <input
                  id="slug"
                  name="slug"
                  value={
                    form.slug
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="fresh-a2-cow-milk"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="price">
                  Price
                </label>

                <div className="input-with-prefix">
                  <span>₹</span>

                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      form.price
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="60"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="oldPrice">
                  Old Price
                </label>

                <div className="input-with-prefix">
                  <span>₹</span>

                  <input
                    id="oldPrice"
                    name="oldPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      form.oldPrice
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="70"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="unit">
                  Unit
                </label>

                <input
                  id="unit"
                  name="unit"
                  value={
                    form.unit
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1 L"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="stockQuantity">
                  Stock Quantity
                </label>

                <input
                  id="stockQuantity"
                  name="stockQuantity"
                  type="number"
                  min="0"
                  step="1"
                  value={
                    form.stockQuantity
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              <div className="form-field form-field-full">
                <label>
                  Product Image
                </label>

                <div className="image-upload-layout">
                  <div
                    className={
                      imagePreview
                        ? "image-preview has-image"
                        : "image-preview"
                    }
                    style={
                      imagePreview
                        ? {
                            backgroundImage: `url("${imagePreview}")`,
                          }
                        : undefined
                    }
                  >
                    {!imagePreview && (
                      <div className="image-preview-empty">
                        <span>
                          IMG
                        </span>

                        <small>
                          No image
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="image-upload-content">
                    <div className="image-upload-buttons">
                      <label
                        htmlFor="product-image"
                        className="choose-image-button"
                      >
                        Choose Image
                      </label>

                      {imagePreview && (
                        <button
                          type="button"
                          className="remove-image-button"
                          onClick={
                            removeSelectedImage
                          }
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      ref={
                        fileInputRef
                      }
                      id="product-image"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.avif,image/jpeg,image/png,image/webp,image/avif"
                      onChange={
                        handleImageSelect
                      }
                      className="image-file-input"
                    />

                    {selectedImageFile ? (
                      <div className="selected-image-info">
                        <strong>
                          {
                            selectedImageFile.name
                          }
                        </strong>

                        <span>
                          {(
                            selectedImageFile.size /
                            1024 /
                            1024
                          ).toFixed(
                            2
                          )}{" "}
                          MB
                        </span>
                      </div>
                    ) : (
                      <span className="image-upload-hint">
                        JPG, PNG, WebP or AVIF ·
                        Maximum 5 MB
                      </span>
                    )}

                    <span className="image-upload-note">
                      The image will be uploaded
                      to your Sai Satvik image
                      storage when you save the
                      product.
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="imageUrl">
                  Existing Image URL
                  <span className="optional-label">
                    Optional
                  </span>
                </label>

                <input
                  id="imageUrl"
                  name="imageUrl"
                  value={
                    form.imageUrl
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://..."
                  disabled={
                    Boolean(
                      selectedImageFile
                    )
                  }
                />

                <span className="field-hint">
                  Choose a new image above,
                  or keep/use an existing image
                  URL.
                </span>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="description">
                  Short Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                  rows="3"
                  placeholder="Fresh, pure and naturally wholesome..."
                />
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="longDescription">
                  Long Description
                </label>

                <textarea
                  id="longDescription"
                  name="longDescription"
                  value={
                    form.longDescription
                  }
                  onChange={
                    handleChange
                  }
                  rows="5"
                  placeholder="Tell customers more about this product..."
                />
              </div>
            </div>

            <div className="product-options">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={
                    form.isActive
                  }
                  onChange={
                    handleChange
                  }
                />

                <span>
                  Active product
                </span>
              </label>

              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="featured"
                  checked={
                    form.featured
                  }
                  onChange={
                    handleChange
                  }
                />

                <span>
                  Featured product
                </span>
              </label>
            </div>

            <div className="product-form-actions">
              <button
                type="button"
                className="product-cancel-button"
                onClick={
                  resetForm
                }
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="product-save-button"
                disabled={
                  saving ||
                  uploadingImage
                }
              >
                {uploadingImage
                  ? "Uploading Image..."
                  : saving
                    ? "Saving Product..."
                    : editingProductId
                      ? "Save Changes"
                      : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-toolbar">
        <div className="products-search">
          <span>⌕</span>

          <input
            type="search"
            value={
              searchTerm
            }
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            placeholder="Search products or categories..."
            aria-label="Search products"
          />
        </div>

        <div className="products-count">
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          products
        </div>
      </div>

      <div className="products-table-card">
        <div className="products-table-header">
          <div>
            <span className="product-kicker">
              INVENTORY
            </span>

            <h2>
              Product Catalogue
            </h2>

            <p>
              Manage your full product range
              from one place.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="products-empty-state">
            <div className="products-spinner" />

            <p>
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length ===
          0 ? (
          <div className="products-empty-state">
            <div className="products-empty-icon">
              +
            </div>

            <strong>
              No products found
            </strong>

            <p>
              Add a product or change your
              search.
            </p>
          </div>
        ) : (
          <div className="products-table-wrap">
            <table className="products-table">
              <thead>
                <tr>
                  <th>
                    Product
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Featured
                  </th>

                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (product) => {
                    const image =
                      getProductImage(
                        product
                      );

                    const updating =
                      statusUpdatingId ===
                      product.id;

                    return (
                      <tr
                        key={
                          product.id
                        }
                      >
                        <td>
                          <div className="product-table-info">
                            <div
                              className={
                                image
                                  ? "product-table-image has-image"
                                  : "product-table-image"
                              }
                              style={
                                image
                                  ? {
                                      backgroundImage: `url("${image}")`,
                                    }
                                  : undefined
                              }
                            >
                              {!image && (
                                <span>
                                  SS
                                </span>
                              )}
                            </div>

                            <div className="product-table-name">
                              <strong>
                                {
                                  product.name
                                }
                              </strong>

                              <span>
                                #{product.id} ·{" "}
                                {product.unit ||
                                  "Unit"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="category-cell">
                            {
                              product
                                .categories
                                ?.name
                            }
                          </span>
                        </td>

                        <td>
                          <strong className="price-cell">
                            {new Intl.NumberFormat(
                              "en-IN",
                              {
                                style:
                                  "currency",
                                currency:
                                  "INR",
                                maximumFractionDigits: 0,
                              }
                            ).format(
                              Number(
                                product.price
                              ) || 0
                            )}
                          </strong>
                        </td>

                        <td>
                          <span
                            className={
                              Number(
                                product.stock_quantity ??
                                  0
                              ) <= 5
                                ? "stock-cell stock-low"
                                : "stock-cell"
                            }
                          >
                            {
                              product.stock_quantity
                            }
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              product.is_active
                                ? "product-status active"
                                : "product-status inactive"
                            }
                          >
                            <span />
                            {product.is_active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        <td>
                          {product.featured ? (
                            <span className="featured-badge">
                              Featured
                            </span>
                          ) : (
                            <span className="not-featured">
                              —
                            </span>
                          )}
                        </td>

                        <td>
                          <div className="product-actions">
                            <button
                              type="button"
                              className="edit-product-button"
                              onClick={() =>
                                handleEditProduct(
                                  product
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="toggle-product-button"
                              disabled={
                                updating
                              }
                              onClick={() =>
                                handleToggleStatus(
                                  product
                                )
                              }
                            >
                              {updating
                                ? "..."
                                : product.is_active
                                  ? "Deactivate"
                                  : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}