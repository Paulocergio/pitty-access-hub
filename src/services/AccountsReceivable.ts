import axios from "axios";
import { AccountsReceivable } from "@/types/AccountsReceivable/AccountsReceivable";

const API_URL = "https://localhost:7274/api/AccountsReceivable";

export const getAccountsReceivables = async (): Promise<AccountsReceivable[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAccountsReceivable = async (
  data: Omit<AccountsReceivable, "Id" | "CreatedAt" | "UpdatedAt">
): Promise<void> => {
  await axios.post(API_URL, data);
};

export const updateAccountsReceivable = async (
  data: AccountsReceivable
): Promise<void> => {
  await axios.put(`${API_URL}/${data.Id}`, data);
};

export const deleteAccountsReceivable = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
