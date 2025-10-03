import axios from "axios";
import { Budget } from "@/types/Budget/Budget";

const API_URL = `${import.meta.env.VITE_API_URL}/Budget`;

export const getBudgets = async (): Promise<Budget[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createBudget = async (budget: Omit<Budget, "Id">) => {
  const { data } = await axios.post(API_URL, budget);
  return data;
};

export const updateBudget = async (budget: Budget) => {
  const { data } = await axios.put(`${API_URL}/${budget.Id}`, budget);
  return data;
};

export const deleteBudget = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
