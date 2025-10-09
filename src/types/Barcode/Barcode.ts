export interface Barcode {
  Id: number;
  Code: string;          // Código de barras
  ProductName: string;   // Nome do produto vinculado
  CreatedAt?: string;
  UpdatedAt?: string;
}
