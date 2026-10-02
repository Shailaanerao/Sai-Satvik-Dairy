"use client";

import {
  useCallback,
  useState,
} from "react";

import useApi from "@/hooks/useApi";

export default function useOrders() {
  const {
    get,
    post,
    patch,
    loading,
    error,
  } = useApi();

  const [orders, setOrders] =
    useState([]);

  const [order, setOrder] =
    useState(null);

  const createOrder = useCallback(
    async (data) => {
      return post(
        "/orders",
        data
      );
    },
    [post]
  );

  const fetchOrders = useCallback(
    async () => {
      const response = await get(
        "/orders"
      );

      const orderList =
        response?.orders ||
        response?.data?.orders ||
        response?.data ||
        [];

      setOrders(
        Array.isArray(orderList)
          ? orderList
          : []
      );

      return orderList;
    },
    [get]
  );

  const fetchOrder = useCallback(
    async (id) => {
      const response = await get(
        `/orders/${id}`
      );

      const orderData =
        response?.order ||
        response?.data?.order ||
        response?.data ||
        null;

      setOrder(orderData);

      return orderData;
    },
    [get]
  );

  const cancelOrder = useCallback(
    async (id) => {
      const response = await patch(
        `/orders/${id}/cancel`
      );

      await fetchOrders();

      return response;
    },
    [patch, fetchOrders]
  );

  const trackOrder = useCallback(
    async (id) => {
      return get(
        `/orders/${id}/tracking`
      );
    },
    [get]
  );

  return {
    orders,
    order,

    loading,
    error,

    createOrder,
    fetchOrders,
    fetchOrder,
    cancelOrder,
    trackOrder,
  };
}