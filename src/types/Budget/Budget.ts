export interface BudgetItem {

  Id?: number;
  BudgetId?: number;
  Description: string;
  Quantity: number;
  UnitPrice: number;
  Total?: number;
}

export interface Budget {
  Id?: number;
  BudgetNumber?: string;
  CustomerName: string;
  Email: string;
  Phone: string;
  Address: string;
  IssueDate: string;
  DueDate?: string;
  Discount: number;
  Tax?: number;
  Total: number;
  Items: BudgetItem[];
  CreatedAt?: string;
  UpdatedAt?: string;
}
