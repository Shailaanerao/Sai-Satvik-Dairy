"use client";

import {
  useCallback,
  useState,
} from "react";

import useApi from "@/hooks/useApi";

export default function useProducts() {
  const {
    get,
    loading,
    error,
  } = useApi();

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [product, setProduct] =
    useState(null);

  const fetchProducts = useCallback(
    async (params = "") => {
      try {
        const response = await get(
          `/products${params}`
        );

        const productList =
          response?.products ||
          response?.data?.products ||
          response?.data ||
          [];

        const safeProducts =
          Array.isArray(productList)
            ? productList
            : [];

        setProducts(safeProducts);

        return safeProducts;
      } catch (requestError) {
        setProducts([]);
        throw requestError;
      }
    },
    [get]
  );

  const fetchProduct = useCallback(
    async (id) => {
      try {
        if (!id) {
          setProduct(null);
          return null;
        }

        const response = await get(
          `/products/${id}`
        );

        const productData =
          response?.product ||
          response?.data?.product ||
          response?.data ||
          null;

        setProduct(productData);

        return productData;
      } catch (requestError) {
        setProduct(null);
        throw requestError;
      }
    },
    [get]
  );

  const fetchByCategory =
    useCallback(
      async (category) => {
        if (!category) {
          return fetchProducts();
        }

        return fetchProducts(
          `?category=${encodeURIComponent(
            category
          )}`
        );
      },
      [fetchProducts]
    );

  const search = useCallback(
    async (query) => {
      if (!query?.trim()) {
        return fetchProducts();
      }

      return fetchProducts(
        `?search=${encodeURIComponent(
          query.trim()
        )}`
      );
    },
    [fetchProducts]
  );

  const fetchCategories =
    useCallback(async () => {
      try {
        const response = await get(
          "/categories"
        );

        const categoryList =
          response?.categories ||
          response?.data?.categories ||
          response?.data ||
          [];

        const safeCategories =
          Array.isArray(categoryList)
            ? categoryList
            : [];

        setCategories(safeCategories);

        return safeCategories;
      } catch (requestError) {
        setCategories([]);
        throw requestError;
      }
    }, [get]);

  return {
    products,
    categories,
    product,

    loading,
    error,

    fetchProducts,
    fetchProduct,
    fetchByCategory,
    search,
    fetchCategories,
  };
}