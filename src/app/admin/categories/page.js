"use client";

import { useCallback, useEffect, useState } from "react";

import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import { supabase } from "@/lib/supabase";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        imageUrl: "",
    });

    const fetchCategories = useCallback(async () => {
        const {
            data,
            error: fetchError,
        } = await supabase
            .from("categories")
            .select(
                "id, name, slug, description, image_url, is_active, created_at"
            )
            .order("id", {
                ascending: true,
            });

        if (fetchError) {
            throw fetchError;
        }

        setCategories(data || []);

        return data || [];
    }, []);

    useEffect(() => {
        let cancelled = false;

        const loadCategories = async () => {
            try {
                setLoading(true);
                setError("");

                const {
                    data,
                    error: fetchError,
                } = await supabase
                    .from("categories")
                    .select(
                        "id, name, slug, description, image_url, is_active, created_at"
                    )
                    .order("id", {
                        ascending: true,
                    });

                if (cancelled) {
                    return;
                }

                if (fetchError) {
                    throw fetchError;
                }

                setCategories(data || []);
            } catch (fetchError) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to fetch categories:",
                    fetchError
                );

                setError(
                    fetchError?.message ||
                    "Failed to load categories."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadCategories();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const createSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleNameChange = (event) => {
        const value = event.target.value;

        setFormData((previous) => ({
            ...previous,
            name: value,
            slug:
                editingId !== null
                    ? previous.slug
                    : createSlug(value),
        }));
    };

    const resetForm = () => {
        setEditingId(null);

        setFormData({
            name: "",
            slug: "",
            description: "",
            imageUrl: "",
        });
    };

    const handleEdit = (category) => {
        setError("");
        setSuccess("");

        setEditingId(category.id);

        setFormData({
            name: category.name || "",
            slug: category.slug || "",
            description:
                category.description || "",
            imageUrl:
                category.image_url || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.name.trim()) {
            setError("Category name is required.");
            return;
        }

        if (!formData.slug.trim()) {
            setError("Category slug is required.");
            return;
        }

        try {
            setSaving(true);

            const {
                data: {
                    session,
                },
            } = await supabase.auth.getSession();

            const accessToken =
                session?.access_token;

            if (!accessToken) {
                throw new Error(
                    "Authentication required."
                );
            }

            const isEditing =
                editingId !== null;

            const endpoint = isEditing
                ? `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${editingId}`
                : `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`;

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
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        slug: formData.slug.trim(),
                        description:
                            formData.description.trim(),
                        imageUrl:
                            formData.imageUrl.trim(),
                    }),
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    `Failed to ${isEditing
                        ? "update"
                        : "create"
                    } category.`
                );
            }

            resetForm();

            setSuccess(
                isEditing
                    ? "Category updated successfully."
                    : "Category created successfully."
            );

            await fetchCategories();
        } catch (submitError) {
            console.error(
                "Save category error:",
                submitError
            );

            setError(
                submitError?.message ||
                "Failed to save category."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleToggleStatus = async (
        category
    ) => {
        setError("");
        setSuccess("");

        try {
            const {
                data: {
                    session,
                },
            } = await supabase.auth.getSession();

            const accessToken =
                session?.access_token;

            if (!accessToken) {
                throw new Error(
                    "Authentication required."
                );
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${category.id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        isActive:
                            !category.is_active,
                    }),
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    "Failed to update category status."
                );
            }

            setSuccess(
                "Category status updated successfully."
            );

            await fetchCategories();
        } catch (toggleError) {
            console.error(
                "Toggle category status error:",
                toggleError
            );

            setError(
                toggleError?.message ||
                "Failed to update category status."
            );
        }
    };

    const handleDelete = async (category) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${category.name}"?`
        );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccess("");

        try {
            setDeletingId(category.id);

            const {
                data: {
                    session,
                },
            } = await supabase.auth.getSession();

            const accessToken =
                session?.access_token;

            if (!accessToken) {
                throw new Error(
                    "Authentication required."
                );
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${category.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    "Failed to delete category."
                );
            }

            if (editingId === category.id) {
                resetForm();
            }

            setSuccess(
                "Category deleted successfully."
            );

            await fetchCategories();
        } catch (deleteError) {
            console.error(
                "Delete category error:",
                deleteError
            );

            setError(
                deleteError?.message ||
                "Failed to delete category."
            );
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <section>
            <AdminPageHeader
                title="Categories"
                description="Manage product categories."
            />

            {error && (
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        background: "#ffeaea",
                        color: "#b00020",
                    }}
                >
                    {error}
                </div>
            )}

            {success && (
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        background: "#eaf7ea",
                        color: "#176b17",
                    }}
                >
                    {success}
                </div>
            )}

            <div
                style={{
                    background: "#ffffff",
                    padding: "24px",
                    borderRadius: "12px",
                    marginBottom: "30px",
                    border: "1px solid #e5e5e5",
                }}
            >
                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: "20px",
                    }}
                >
                    {editingId !== null
                        ? "Edit Category"
                        : "Add Category"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(2, minmax(0, 1fr))",
                            gap: "16px",
                        }}
                    >
                        <div>
                            <label htmlFor="category-name">
                                Category Name
                            </label>

                            <input
                                id="category-name"
                                name="name"
                                value={formData.name}
                                onChange={handleNameChange}
                                placeholder="Example: Milk"
                                style={{
                                    width: "100%",
                                    marginTop: "6px",
                                    padding: "10px 12px",
                                    border:
                                        "1px solid #d5d5d5",
                                    borderRadius: "7px",
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="category-slug">
                                Slug
                            </label>

                            <input
                                id="category-slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="milk"
                                style={{
                                    width: "100%",
                                    marginTop: "6px",
                                    padding: "10px 12px",
                                    border:
                                        "1px solid #d5d5d5",
                                    borderRadius: "7px",
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="category-description">
                                Description
                            </label>

                            <input
                                id="category-description"
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={handleChange}
                                placeholder="Category description"
                                style={{
                                    width: "100%",
                                    marginTop: "6px",
                                    padding: "10px 12px",
                                    border:
                                        "1px solid #d5d5d5",
                                    borderRadius: "7px",
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="category-image">
                                Image URL
                            </label>

                            <input
                                id="category-image"
                                name="imageUrl"
                                value={
                                    formData.imageUrl
                                }
                                onChange={handleChange}
                                placeholder="/milk.jpg"
                                style={{
                                    width: "100%",
                                    marginTop: "6px",
                                    padding: "10px 12px",
                                    border:
                                        "1px solid #d5d5d5",
                                    borderRadius: "7px",
                                }}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "20px",
                        }}
                    >
                        <button
                            type="submit"
                            disabled={saving}
                            style={{
                                padding: "10px 18px",
                                border: "none",
                                borderRadius: "7px",
                                background: "#222222",
                                color: "#ffffff",
                                cursor: saving
                                    ? "not-allowed"
                                    : "pointer",
                                opacity: saving ? 0.6 : 1,
                            }}
                        >
                            {saving
                                ? editingId !== null
                                    ? "Updating..."
                                    : "Creating..."
                                : editingId !== null
                                    ? "Update Category"
                                    : "Add Category"}
                        </button>

                        {editingId !== null && (
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={saving}
                                style={{
                                    padding:
                                        "10px 18px",
                                    border:
                                        "1px solid #d5d5d5",
                                    borderRadius: "7px",
                                    background: "#ffffff",
                                    cursor: saving
                                        ? "not-allowed"
                                        : "pointer",
                                }}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    border:
                        "1px solid #e5e5e5",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        padding: "20px 24px",
                        borderBottom:
                            "1px solid #eeeeee",
                    }}
                >
                    <h2 style={{ margin: 0 }}>
                        All Categories
                    </h2>
                </div>

                {loading ? (
                    <p
                        style={{
                            padding: "24px",
                        }}
                    >
                        Loading categories...
                    </p>
                ) : categories.length ===
                    0 ? (
                    <p
                        style={{
                            padding: "24px",
                        }}
                    >
                        No categories found.
                    </p>
                ) : (
                    <div
                        style={{
                            overflowX: "auto",
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderCollapse:
                                    "collapse",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            padding:
                                                "14px 20px",
                                            textAlign:
                                                "left",
                                        }}
                                    >
                                        ID
                                    </th>

                                    <th
                                        style={{
                                            padding:
                                                "14px 20px",
                                            textAlign:
                                                "left",
                                        }}
                                    >
                                        Name
                                    </th>

                                    <th
                                        style={{
                                            padding:
                                                "14px 20px",
                                            textAlign:
                                                "left",
                                        }}
                                    >
                                        Slug
                                    </th>

                                    <th
                                        style={{
                                            padding:
                                                "14px 20px",
                                            textAlign:
                                                "left",
                                        }}
                                    >
                                        Status
                                    </th>

                                    <th
                                        style={{
                                            padding:
                                                "14px 20px",
                                            textAlign:
                                                "left",
                                        }}
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map(
                                    (category) => (
                                        <tr
                                            key={category.id}
                                            style={{
                                                borderTop:
                                                    "1px solid #eeeeee",
                                            }}
                                        >
                                            <td
                                                style={{
                                                    padding:
                                                        "14px 20px",
                                                }}
                                            >
                                                {category.id}
                                            </td>

                                            <td
                                                style={{
                                                    padding:
                                                        "14px 20px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {category.name}
                                            </td>

                                            <td
                                                style={{
                                                    padding:
                                                        "14px 20px",
                                                }}
                                            >
                                                {category.slug}
                                            </td>

                                            <td
                                                style={{
                                                    padding:
                                                        "14px 20px",
                                                }}
                                            >
                                                {category.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </td>

                                            <td
                                                style={{
                                                    padding:
                                                        "14px 20px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display:
                                                            "flex",
                                                        gap: "8px",
                                                        flexWrap:
                                                            "wrap",
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                category
                                                            )
                                                        }
                                                        style={{
                                                            padding:
                                                                "8px 12px",
                                                            border:
                                                                "none",
                                                            borderRadius:
                                                                "6px",
                                                            cursor:
                                                                "pointer",
                                                            background:
                                                                "#eeeeee",
                                                        }}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                category
                                                            )
                                                        }
                                                        style={{
                                                            padding:
                                                                "8px 12px",
                                                            border:
                                                                "none",
                                                            borderRadius:
                                                                "6px",
                                                            cursor:
                                                                "pointer",
                                                        }}
                                                    >
                                                        {category.is_active
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                category
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            category.id
                                                        }
                                                        style={{
                                                            padding:
                                                                "8px 12px",
                                                            border:
                                                                "none",
                                                            borderRadius:
                                                                "6px",
                                                            cursor:
                                                                deletingId ===
                                                                    category.id
                                                                    ? "not-allowed"
                                                                    : "pointer",
                                                            background:
                                                                "#ffeaea",
                                                            color:
                                                                "#b00020",
                                                            opacity:
                                                                deletingId ===
                                                                    category.id
                                                                    ? 0.6
                                                                    : 1,
                                                        }}
                                                    >
                                                        {deletingId ===
                                                            category.id
                                                            ? "Deleting..."
                                                            : "Delete"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}