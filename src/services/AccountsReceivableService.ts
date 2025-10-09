import axios from "axios";
import { AccountsReceivable } from "@/types/AccountsReceivable/AccountsReceivable";

const API_URL = "https://localhost:7274/api/AccountsReceivable";

export async function getAccountsReceivables(): Promise<AccountsReceivable[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createAccountsReceivable(
  data: Omit<AccountsReceivable, "Id">
): Promise<void> {
  await axios.post(API_URL, data);
}

export async function updateAccountsReceivable(
  data: AccountsReceivable
): Promise<void> {
  await axios.put(`${API_URL}/${data.Id}`, data);
}

export async function deleteAccountsReceivable(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
