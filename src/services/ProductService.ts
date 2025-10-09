import axios from "axios";
import { Product } from "@/types/Product/Product";

const API_URL = `${import.meta.env.VITE_API_URL}/Product`;

// Mapeia do backend (camelCase) para o frontend (minúsculo)
const mapToFront = (p: any): Product => ({
  id: p.id,
  name: p.name,
  description: p.description,
  purchaseprice: p.purchasePrice,
  saleprice: p.salePrice,
  category: p.category,
  stockquantity: p.stockQuantity,
  status: p.status,
  barcode: p.barcode,
  createdat: p.createdAt,
  updatedat: p.updatedAt,
});

// Mapeia do frontend (minúsculo) para o backend (camelCase)
const mapToBack = (p: Product | Omit<Product, "id" | "createdat" | "updatedat">) => ({
  id: "id" in p ? p.id : undefined,
  name: p.name,
  description: p.description,
  purchasePrice: p.purchaseprice,
  salePrice: p.saleprice,
  category: p.category,
  stockQuantity: p.stockquantity,
  status: p.status,
  barcode: p.barcode,
  createdAt: "createdat" in p ? p.createdat : undefined,
  updatedAt: "updatedat" in p ? p.updatedat : undefined,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data.map(mapToFront);
};

export const createProduct = async (
  data: Omit<Product, "id" | "createdat" | "updatedat">
): Promise<void> => {
  await axios.post(API_URL, mapToBack(data));
};

export const updateProduct = async (
  id: number,
  data: Omit<Product, "id" | "createdat" | "updatedat">
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, mapToBack(data));
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
