export type AccountsPayableStatus = "PENDENTE" | "PAGO" | "ATRASADA";

export interface AccountsPayable {
  Id: number;
  SupplierName: string;
  Description: string;
  Amount: number;
  DueDate: string;

  PaymentDate?: string | null;

  Status: AccountsPayableStatus;

  IsOverdue: boolean;

  CreatedAt?: string;
  UpdatedAt?: string;
}
