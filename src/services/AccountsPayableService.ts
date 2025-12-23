import { api } from "./api";
import { AccountsPayable } from "@/types/AccountsPayable/AccountsPayable";

const URL = "/api/AccountsPayable";

type FrontStatus = "PENDENTE" | "PAGA" | "ATRASADA" | "PAGA_COM_ATRASO";

const statusToFront = (s: number): FrontStatus => {
  switch (s) {
    case 1: return "PAGA";
    case 2: return "ATRASADA";
    case 3: return "PAGA_COM_ATRASO";
    default: return "PENDENTE";
  }
};

const statusToBack = (s: FrontStatus): number => {
  // O backend calcula Overdue/PaidLate, então aqui só faz sentido mandar 0 ou 1.
  // Se vier ATRASADA/PAGA_COM_ATRASO (ex.: edit de registro antigo), mantém coerência:
  return s === "PAGA" || s === "PAGA_COM_ATRASO" ? 1 : 0;
};

const toIsoOrNull = (v?: string | null) => {
  if (!v) return null;
  // aceita "YYYY-MM-DD" e transforma em ISO
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const mapToFront = (a: any): AccountsPayable => ({
  Id: a.id,
  SupplierName: a.supplier,
  Description: a.description,
  Amount: a.amount,
  DueDate: a.dueDate,                 // pode ser ISO; seu input type="date" deve fazer slice(0,10) no modal
  PaymentDate: a.paymentDate ?? null, // novo
  Status: statusToFront(Number(a.status)),
  IsOverdue: Boolean(a.isOverdue),
});

const mapToBack = (a: AccountsPayable | Omit<AccountsPayable, "Id">) => {
  const status = a.Status as FrontStatus;

  const wantsPaid = status === "PAGA" || status === "PAGA_COM_ATRASO";

  return {
    supplier: a.SupplierName,
    description: a.Description,
    amount: a.Amount,
    dueDate: toIsoOrNull(a.DueDate), // obrigatório no backend, mas mantenho null-safe
    status: statusToBack(status),

    // Se marcou como paga, manda PaymentDate (se não mandar, seu backend pode assumir UtcNow,
    // mas se você ativou validação exigindo PaymentDate, então mande sempre).
    paymentDate: wantsPaid ? toIsoOrNull((a as any).PaymentDate) : null,

    // IsOverdue o backend recalcula; pode mandar false para não “poluir”
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
