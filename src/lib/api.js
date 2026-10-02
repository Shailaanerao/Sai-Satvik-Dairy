import { supabase } from "@/lib/supabase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not configured. Add it to .env.local."
  );
}

async function request(endpoint, options = {}) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token;

    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      ...options.headers,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: options.method || "GET",
      cache: "no-store",
      signal: controller.signal,
      headers,
    });

    const contentType =
      response.headers.get("content-type") || "";

    let data = null;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text || null;
    }

    if (!response.ok) {
      const error = new Error(
        data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`
      );

      error.status = response.status;
      error.data = data;

      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please try again."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function get(endpoint, options = {}) {
  return request(endpoint, {
    ...options,
    method: "GET",
  });
}

export async function post(
  endpoint,
  body,
  options = {}
) {
  return request(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function put(
  endpoint,
  body,
  options = {}
) {
  return request(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function patch(
  endpoint,
  body,
  options = {}
) {
  return request(endpoint, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function remove(
  endpoint,
  options = {}
) {
  return request(endpoint, {
    ...options,
    method: "DELETE",
  });
}

export default request;