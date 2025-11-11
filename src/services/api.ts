// src/services/api.ts
import axios, {
  AxiosHeaders,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";

const RAW = (import.meta.env.VITE_API_URL as string) ?? "";
const BASE = RAW.replace(/\/+$/, ""); // remove / no final
if (!BASE) console.warn("VITE_API_URL não definida. Configure no .env.");

export const api = axios.create({
  baseURL: BASE, // ex.: https://localhost:7274/api
  // timeout: 10000,
});

// injeta Authorization: Bearer <token> em TODAS as requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      // quando headers é objeto literal
      (config.headers as any) = {
        ...(config.headers as Record<string, any> ?? {}),
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return config;
});

// trata 401 globalmente (opcional)
api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err?.response?.status === 401) {
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
