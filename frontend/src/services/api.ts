import axios, { AxiosError } from "axios";
import { LoginUserResponse } from "../models/users/login-user-response";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          } else {
            const { data } = await api.post<LoginUserResponse>(
              "/users/login-with-refresh-token",
              {
                refreshToken,
              },
            );

            if (data.accessToken && data.refreshToken) {
              localStorage.setItem("accessToken", data.accessToken);
              localStorage.setItem("refreshToken", data.refreshToken);
              if (error.config) {
                return api.request(error.config);
              }
            }
          }
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
