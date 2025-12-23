import { api } from "./api";
import { Budget } from "@/types/Budget/Budget";
const BASE = "/api/Budget";
const toFront = (b: any): Budget => ({
  Id: b.id,
  BudgetNumber: b.budgetNumber,
  CustomerName: b.customerName,
  Email: b.email,
  Phone: b.phone,
  Address: b.address,
  IssueDate: b.issueDate,
  DueDate: b.dueDate,
  Discount: b.discount,
  Total: b.total,
  CreatedAt: b.createdAt,
  UpdatedAt: b.updatedAt,
  Items: (b.items ?? []).map((i: any) => ({
    Id: i.id,
    BudgetId: i.budgetId,
    Description: i.description,
    Quantity: i.quantity,
    UnitPrice: i.unitPrice,
    Total: i.total,
  })),
});

export async function getBudgets(): Promise<Budget[]> {
  const { data } = await api.get(`${BASE}/get-all`);
  return Array.isArray(data) ? data.map(toFront) : [];
}

export async function getBudgetById(id: number): Promise<Budget | null> {
  const { data } = await api.get(`${BASE}/get-by-id/${id}`);
  return data ? toFront(data) : null;
}

export async function createBudget(budget: Omit<Budget, "Id">) {
  const { data } = await api.post(`${BASE}/create`, budget);
  return toFront(data);
}

export async function updateBudget(budget: Budget) {
  const { data } = await api.put(`${BASE}/update/${budget.Id}`, budget);
  return toFront(data);
}

export async function deleteBudget(id: number) {
  await api.delete(`${BASE}/delete/${id}`); // 204 NoContent
}

export async function deleteBudgetItem(itemId: number) {
  await api.delete(`${BASE}/delete-item/${itemId}`); // 204 NoContent
}
