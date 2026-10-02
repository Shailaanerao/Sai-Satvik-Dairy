"use client";

import {
  useCallback,
  useState,
} from "react";

import useApi from "@/hooks/useApi";

export default function useProfile() {
  const {
    get,
    put,
    loading,
    error,
  } = useApi();

  const [profile, setProfile] =
    useState(null);

  const fetchProfile = useCallback(
    async () => {
      const response = await get(
        "/profile"
      );

      const profileData =
        response?.profile ||
        response?.user ||
        response?.data?.profile ||
        response?.data?.user ||
        null;

      setProfile(profileData);

      return profileData;
    },
    [get]
  );

  const updateProfile =
    useCallback(
      async (data) => {
        const response = await put(
          "/profile",
          data
        );

        const updatedProfile =
          response?.profile ||
          response?.user ||
          response?.data?.profile ||
          response?.data?.user ||
          null;

        if (updatedProfile) {
          setProfile(updatedProfile);
        }

        return response;
      },
      [put]
    );

  const updateAddress =
    useCallback(
      async (addressData) => {
        const response = await put(
          "/profile/address",
          addressData
        );

        await fetchProfile();

        return response;
      },
      [put, fetchProfile]
    );

  return {
    profile,

    loading,
    error,

    fetchProfile,
    updateProfile,
    updateAddress,
  };
}