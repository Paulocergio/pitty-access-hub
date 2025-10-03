export interface BudgetItem {
  Description: string;
  Quantity: number;
  UnitPrice: number;
}

export interface Budget {
  Id: number;
  CustomerName: string;
  Email: string;
  Phone: string;
  Address: string;
  IssueDate: string;
  DueDate: string;
  Items: BudgetItem[];
  Discount: number;
  Tax: number;
  Total: number;
}
