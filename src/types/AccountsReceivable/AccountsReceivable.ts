export interface AccountsReceivable {
  Id: number;
  Description: string;          // Descrição da conta (ex: Venda de produto)
  CustomerName: string;         // Nome do cliente
  DueDate: string;              // Data de vencimento (YYYY-MM-DD)
  PaymentDate?: string | null;  // Data de pagamento (opcional)
  Amount: number;               // Valor da conta
  Status: string;               // "PENDENTE", "RECEBIDO", "ATRASADO"
  CreatedAt?: string;
  UpdatedAt?: string;
}
