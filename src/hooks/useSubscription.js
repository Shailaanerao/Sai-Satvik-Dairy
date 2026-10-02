"use client";

import {
  useCallback,
  useState,
} from "react";

import useApi from "@/hooks/useApi";

export default function useSubscription() {
  const {
    get,
    post,
    patch,
    loading,
    error,
  } = useApi();

  const [plans, setPlans] =
    useState([]);

  const [subscription, setSubscription] =
    useState(null);

  const fetchPlans = useCallback(
    async () => {
      const response = await get(
        "/subscriptions/plans"
      );

      const planList =
        response?.plans ||
        response?.data?.plans ||
        response?.data ||
        [];

      setPlans(
        Array.isArray(planList)
          ? planList
          : []
      );

      return planList;
    },
    [get]
  );

  const fetchSubscription =
    useCallback(async () => {
      const response = await get(
        "/subscriptions/me"
      );

      const currentSubscription =
        response?.subscription ||
        response?.data?.subscription ||
        null;

      setSubscription(
        currentSubscription
      );

      return currentSubscription;
    }, [get]);

  const subscribe = useCallback(
    async (data) => {
      const response = await post(
        "/subscriptions",
        data
      );

      await fetchSubscription();

      return response;
    },
    [post, fetchSubscription]
  );

  const cancelSubscription =
    useCallback(async () => {
      const response = await patch(
        "/subscriptions/cancel"
      );

      await fetchSubscription();

      return response;
    }, [patch, fetchSubscription]);

  const pauseSubscription =
    useCallback(async () => {
      const response = await patch(
        "/subscriptions/pause"
      );

      await fetchSubscription();

      return response;
    }, [patch, fetchSubscription]);

  const resumeSubscription =
    useCallback(async () => {
      const response = await patch(
        "/subscriptions/resume"
      );

      await fetchSubscription();

      return response;
    }, [patch, fetchSubscription]);

  return {
    plans,
    subscription,

    loading,
    error,

    fetchPlans,
    fetchSubscription,

    subscribe,
    cancelSubscription,
    pauseSubscription,
    resumeSubscription,
  };
}