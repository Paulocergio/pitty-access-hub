import axios from "axios";

const BASE = (import.meta.env.VITE_API_URL as string).replace(/\/+$/, "");

const API_URL = `${BASE}/User/login`;

export interface LoginResponse {
  name: string;
  email: string;
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {

  if (import.meta.env.DEV) console.log("[AuthService] POST", API_URL);

  const response = await axios.post<LoginResponse>(API_URL, { email, password }, {

  });
  return response.data;
};
