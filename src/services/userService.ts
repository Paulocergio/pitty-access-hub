import { api } from "./api";
import { Users } from "@/types/Users/User";

const BASE = "/api/User";

export async function getUsers(): Promise<Users[]> {
  const { data } = await api.get(`${BASE}/get-all`);
  return Array.isArray(data) ? data : [];
}

export async function getUserById(id: number): Promise<Users | null> {
  const { data } = await api.get(`${BASE}/get-by-id/${id}`);
  return data ?? null;
}

export async function createUser(user: Users) {
  const { data } = await api.post(`${BASE}/create`, user);
  return data;
}

export async function updateUser(user: Users) {
  const id = (user as any).id ?? (user as any).Id;
  const { data } = await api.put(`${BASE}/update/${id}`, user);
  return data;
}

export async function deleteUser(id: number) {
  await api.delete(`${BASE}/delete/${id}`);
}



export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post(`${BASE}/login`, payload);
  return data;
}

