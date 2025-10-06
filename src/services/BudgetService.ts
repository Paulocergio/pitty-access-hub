import axios from "axios";
import { Budget } from "@/types/Budget/Budget";

const API_URL = `${import.meta.env.VITE_API_URL}/Budget`;

export const getBudgets = async (): Promise<Budget[]> => {
  const { data } = await axios.get(API_URL);

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
    Items: b.items?.map((i: any) => ({
      Id: i.id,
      BudgetId: i.budgetId,
      Description: i.description,
      Quantity: i.quantity,
      UnitPrice: i.unitPrice,
      Total: i.total,
    })) || []
  }));
};

export const createBudget = async (budget: Omit<Budget, "Id">) => {
  const { data } = await axios.post(API_URL, budget);
  return data;
};

export const updateBudget = async (budget: Budget) => {
  const { data } = await axios.put(`${API_URL}/${budget.Id}`, budget);
  return data;
};




export const deleteBudget = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const deleteBudgetItem = async (itemId: number): Promise<void> => {
  await axios.delete(`${API_URL}/item/${itemId}`);
};