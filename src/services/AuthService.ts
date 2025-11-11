// src/services/authService.ts
import { api } from "./api";

export interface LoginResponse {
  name: string;
  email: string;
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/User/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
}
