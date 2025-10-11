import axios from "axios";
import { AccountsPayable } from "@/types/AccountsPayable/AccountsPayable";

const API_URL = `${import.meta.env.VITE_API_URL}/AccountsPayable`;

// Mapeia do backend → frontend
const mapToFront = (a: any): AccountsPayable => ({
  Id: a.id,
  SupplierName: a.supplier,
  Description: a.description,
  Amount: a.amount,
  DueDate: a.dueDate,
  PaymentDate: a.paymentDate,     // ✅ novo
  Status: a.status === 1 ? "PAGO" : "PENDENTE",
  IsOverdue: a.isOverdue,         // ✅ novo
});

// Mapeia do frontend → backend
const mapToBack = (a: AccountsPayable | Omit<AccountsPayable, "Id">) => ({
  id: "Id" in a ? a.Id : undefined,
  supplier: a.SupplierName,
  description: a.Description,
  amount: a.Amount,
  // 🔹 Garante que o formato seja "YYYY-MM-DDTHH:mm:ss.sssZ" (UTC)
  dueDate: a.DueDate ? new Date(a.DueDate).toISOString() : null,
  status: a.Status === "PAGA" ? 1 : 0,
});


// 🔹 Buscar todas as contas
export const getAccountsPayables = async (): Promise<AccountsPayable[]> => {
  const response = await axios.get(API_URL);
  return response.data.map(mapToFront);
};

// 🔹 Criar nova conta
export const createAccountsPayable = async (
  data: Omit<AccountsPayable, "Id" | "CreatedAt" | "UpdatedAt">
): Promise<void> => {
  await axios.post(API_URL, mapToBack(data));
};

// 🔹 Atualizar conta
export const updateAccountsPayable = async (data: AccountsPayable): Promise<void> => {
  await axios.put(`${API_URL}/${data.Id}`, mapToBack(data));
};

// 🔹 Excluir conta
export const deleteAccountsPayable = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
