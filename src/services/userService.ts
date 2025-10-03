import axios from "axios";
import { Users } from "@/types/Users/User";

const API_URL = `${import.meta.env.VITE_API_URL}/User`;

export const getUsers = async (): Promise<Users[]> => {
  const response = await axios.get(`${API_URL}`);
  return Array.isArray(response.data) ? response.data : [];
};

export const createUser = async (user: Users) => {
  try {
    const { data } = await axios.post(API_URL, user);
    return data;
  } catch (error: any) {
    if (error.response) throw error;
    throw new Error("Erro ao criar usuário");
  }
};

export const updateUser = async (user: Users) => {
  try {
    const { data } = await axios.put(`${API_URL}/${user.id}`, user);
    return data;
  } catch (error: any) {
    if (error.response) throw error;
    throw new Error("Erro ao atualizar usuário");
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/hard/${id}`);
  } catch (error: any) {
    if (error.response) throw error;
    throw new Error("Erro ao deletar usuário");
  }
};