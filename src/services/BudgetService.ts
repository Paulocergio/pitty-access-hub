import { api } from "./api";
import { Budget } from "@/types/Budget/Budget";

const URL = "/Budget";

export async function getBudgets(): Promise<Budget[]> {
  const { data } = await api.get(URL);
  return data.map((b: any) => ({
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
  }));
}
export async function createBudget(budget: Omit<Budget,"Id">) {
  const { data } = await api.post(URL, budget);
  return data;
}
export async function updateBudget(budget: Budget) {
  const { data } = await api.put(`${URL}/${budget.Id}`, budget);
  return data;
}
export async function deleteBudget(id: number){ await api.delete(`${URL}/${id}`); }
export async function deleteBudgetItem(itemId: number){ await api.delete(`${URL}/item/${itemId}`); }
