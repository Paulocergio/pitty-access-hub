import { api } from "./api";
import { AccountsPayable } from "@/types/AccountsPayable/AccountsPayable";

const URL = "/AccountsPayable";

const mapToFront = (a: any): AccountsPayable => ({
  Id: a.id,
  SupplierName: a.supplier,
  Description: a.description,
  Amount: a.amount,
  DueDate: a.dueDate,
  PaymentDate: a.paymentDate,
  Status: a.status === 1 ? "PAGO" : "PENDENTE",
  IsOverdue: a.isOverdue,
});

const mapToBack = (a: AccountsPayable | Omit<AccountsPayable, "Id">) => ({
  id: "Id" in a ? a.Id : undefined,
  supplier: a.SupplierName,
  description: a.Description,
  amount: a.Amount,
  dueDate: a.DueDate ? new Date(a.DueDate).toISOString() : null,
  status: a.Status === "PAGO" ? 1 : 0, // <- você estava usando "PAGA"
});

export async function getAccountsPayables(): Promise<AccountsPayable[]> {
  const { data } = await api.get(URL);
  return Array.isArray(data) ? data.map(mapToFront) : [];
}
export async function createAccountsPayable(data: Omit<AccountsPayable,"Id"|"CreatedAt"|"UpdatedAt">): Promise<void> {
  await api.post(URL, mapToBack(data));
}
export async function updateAccountsPayable(data: AccountsPayable): Promise<void> {
  await api.put(`${URL}/${data.Id}`, mapToBack(data));
}
export async function deleteAccountsPayable(id: number): Promise<void> {
  await api.delete(`${URL}/${id}`);
}
