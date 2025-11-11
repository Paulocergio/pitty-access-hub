import { api } from "./api";
import { Users } from "@/types/Users/User";

const URL = "/User";

export async function getUsers(): Promise<Users[]>{
  const { data } = await api.get(URL);
  return Array.isArray(data) ? data : [];
}
export async function createUser(user: Users){
  const { data } = await api.post(URL, user);
  return data;
}
export async function updateUser(user: Users){
  const { data } = await api.put(`${URL}/${user.id}`, user);
  return data;
}
export async function deleteUser(id: number){
  await api.delete(`${URL}/${id}`); // soft/hard conforme backend
}
