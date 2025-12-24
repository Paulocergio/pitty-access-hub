import { api } from "./api";
import { AccountsPayable, AccountsPayableStatus } from "@/types/AccountsPayable/AccountsPayable";

const URL = "/api/AccountsPayable";

const statusToFront = (s: number): AccountsPayableStatus => {
  switch (s) {
    case 1: return "PAGO";
    case 2: return "ATRASADA";
    default: return "PENDENTE";
  }
};

const statusToBack = (s: AccountsPayableStatus): number => {
  return s === "PAGO" ? 1 : 0;
};


const toIsoOrNull = (v?: string | null) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const mapToFront = (a: any): AccountsPayable => ({
  Id: a.id,
  SupplierName: a.supplier,
  Description: a.description,
  Amount: a.amount,
  DueDate: a.dueDate,
  PaymentDate: a.paymentDate ?? null,
  Status: statusToFront(Number(a.status)),
  IsOverdue: Boolean(a.isOverdue),
  CreatedAt: a.createdAt,
  UpdatedAt: a.updatedAt,
});

const mapToBack = (a: AccountsPayable | Omit<AccountsPayable, "Id">) => {
  const wantsPaid = a.Status === "PAGO";

  return {
    supplier: a.SupplierName,
    description: a.Description,
    amount: a.Amount,
    dueDate: toIsoOrNull(a.DueDate),

    // manda só 0/1
    status: statusToBack(a.Status),

    // paga => exige PaymentDate
    paymentDate: wantsPaid ? toIsoOrNull(a.PaymentDate ?? null) : null,

    // backend recalcula
    isOverdue: false,
  };
};

export async function getAccountsPayables(): Promise<AccountsPayable[]> {
  const { data } = await api.get(`${URL}/get-all`);
  return Array.isArray(data) ? data.map(mapToFront) : [];
}

export async function getAccountsPayableById(id: number): Promise<AccountsPayable> {
  const { data } = await api.get(`${URL}/get-by-id/${id}`);
  return mapToFront(data);
}

export async function createAccountsPayable(
  payload: Omit<AccountsPayable, "Id" | "CreatedAt" | "UpdatedAt">
): Promise<void> {
  await api.post(`${URL}/create`, mapToBack(payload));
}

export async function updateAccountsPayable(data: AccountsPayable): Promise<void> {
  await api.put(`${URL}/update/${data.Id}`, mapToBack(data));
}

export async function deleteAccountsPayable(id: number): Promise<void> {
  await api.delete(`${URL}/delete/${id}`);
}
