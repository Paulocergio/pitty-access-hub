import { api } from "./api";
import { AccountsReceivable } from "@/types/AccountsReceivable/AccountsReceivable";

const URL = "/AccountsReceivable";

export async function getAccountsReceivables(): Promise<AccountsReceivable[]> {
  const { data } = await api.get(URL);
  return data;
}
export async function createAccountsReceivable(data: Omit<AccountsReceivable,"Id">): Promise<void> {
  await api.post(URL, data);
}
export async function updateAccountsReceivable(data: AccountsReceivable): Promise<void> {
  await api.put(`${URL}/${data.Id}`, data);
}
export async function deleteAccountsReceivable(id: number): Promise<void> {
  await api.delete(`${URL}/${id}`);
}
