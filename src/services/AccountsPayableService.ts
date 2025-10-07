import axios from "axios";
import { AccountsPayable } from "@/types/AccountsPayable/AccountsPayable";

const API_URL = "https://localhost:7274/api/AccountsPayable";

// 🔹 Buscar todas as contas a pagar
export const getAccountsPayables = async (): Promise<AccountsPayable[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔹 Criar nova conta
export const createAccountsPayable = async (
  data: Omit<AccountsPayable, "Id" | "CreatedAt" | "UpdatedAt">
): Promise<void> => {
  await axios.post(API_URL, data);
};

// 🔹 Atualizar conta existente
export const updateAccountsPayable = async (
  data: AccountsPayable
): Promise<void> => {
  await axios.put(`${API_URL}/${data.Id}`, data);
};

// 🔹 Excluir conta
export const deleteAccountsPayable = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
