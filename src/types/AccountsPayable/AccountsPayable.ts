// src/types/AccountsPayable/AccountsPayable.ts

export interface AccountsPayable {
  Id: number;
  Description: string;           // Descrição da conta (ex: “Fatura de energia”)
  SupplierName: string;          // Nome do fornecedor
  DueDate: string;               // Data de vencimento (YYYY-MM-DD)
  PaymentDate?: string | null;   // Data em que foi paga
  Amount: number;                // Valor da conta
  Status: string;                // “PENDENTE”, “PAGO”, “ATRASADO”
  CreatedAt?: string;
  UpdatedAt?: string;
}
