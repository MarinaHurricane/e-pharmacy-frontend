"use client";

import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

let refreshPromise: Promise<void> | null = null;

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
    skipAuthRefresh?: boolean;
  }
}

export const clientApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

clientApi.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest?.skipAuthRefresh) {
      return Promise.reject(error);
    }

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = clientApi
          .post("/auth/refresh", undefined, {
            skipAuthRefresh: true,
          })
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return clientApi(originalRequest);
    } catch (refreshError) {
      if (
        axios.isAxiosError(refreshError) &&
        refreshError.response?.status === 401
      ) {
        window.location.href = "/";
      }

      return Promise.reject(refreshError);
    }
  }
);