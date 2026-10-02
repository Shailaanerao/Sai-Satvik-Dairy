"use client";

import { useCallback, useState } from "react";

import {
  get as apiGet,
  post as apiPost,
  put as apiPut,
  patch as apiPatch,
  remove as apiRemove,
} from "@/lib/api";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (apiFunction, ...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFunction(...args);

        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const get = useCallback(
    (...args) => execute(apiGet, ...args),
    [execute]
  );

  const post = useCallback(
    (...args) => execute(apiPost, ...args),
    [execute]
  );

  const put = useCallback(
    (...args) => execute(apiPut, ...args),
    [execute]
  );

  const patch = useCallback(
    (...args) => execute(apiPatch, ...args),
    [execute]
  );

  const remove = useCallback(
    (...args) => execute(apiRemove, ...args),
    [execute]
  );

  return {
    get,
    post,
    put,
    patch,
    remove,
    loading,
    error,
  };
}