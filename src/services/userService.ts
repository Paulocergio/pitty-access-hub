import axios from "axios";
import { Users } from "@/types/Users/User";

const API_URL = `${import.meta.env.VITE_API_URL}/User`;

export const getUsers = async (): Promise<Users[]> => {
  const response = await axios.get(`${API_URL}`);
  return Array.isArray(response.data) ? response.data : [];
};


export const createUser = async (user: Users) => {
  const { data } = await axios.post(API_URL, user);
  return data;
};

export const updateUser = async (user: Users) => {
  const { data } = await axios.put(`${API_URL}/${user.id}`, user);
  return data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/hard/${id}`);
}