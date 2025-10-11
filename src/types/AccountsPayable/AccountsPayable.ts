export interface AccountsPayable {
  Id: number;
  SupplierName: string;
  Description: string;
  Amount: number;
  DueDate: string;
  PaymentDate?: string | null; // ✅ novo
  Status: string; // “PENDENTE” | “PAGO”
  IsOverdue?: boolean; // ✅ novo
  CreatedAt?: string;
  UpdatedAt?: string;
}
