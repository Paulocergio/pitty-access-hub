// src/services/api.ts
import axios, { AxiosHeaders, type InternalAxiosRequestConfig, type AxiosError } from "axios";

const RAW = (import.meta.env.VITE_API_URL as string) ?? "";
const BASE = RAW.replace(/\/+$/, "");
if (!BASE) console.warn("VITE_API_URL não definida. Configure no .env.");

export const api = axios.create({
  baseURL: BASE, 
});

const isPublicEndpoint = (url?: string) => {
  if (!url) return false;


  const normalized = url.replace(/\/{2,}/g, "/");

  return (
    normalized === "/api/User/login" ||
    normalized.startsWith("/api/User/login?")
  );
};


api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url ?? "";

  // IMPORTANTE: não enviar Authorization em login/register
  if (isPublicEndpoint(url)) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.delete("Authorization");
    } else if (config.headers) {
      delete (config.headers as any).Authorization;
    }
    return config;
  }

  // Padrão do seu frontend: você salva "authToken"
  const token = localStorage.getItem("authToken");
  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as any) = {
        ...((config.headers as Record<string, any>) ?? {}),
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err?.response?.status === 401) {
      // opcional: tratar sessão expirada
      // localStorage.removeItem("authToken");
      // localStorage.removeItem("isAuthenticated");
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
