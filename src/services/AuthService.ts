
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
export type RegisterRequest = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

export const register = async (payload: RegisterRequest) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
