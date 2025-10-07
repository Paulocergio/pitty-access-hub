import axios from "axios";

import  {Product } from"@/types/Produrct/Produrct"


import { Supplier } from "@/types/Supplier/Supplier";

const API_URL = "https://localhost:7274/api/Product"; // ajuste se necessário

export async function getProducts(): Promise<Product[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createProduct(data: Omit<Product, "Id">): Promise<void> {
  await axios.post(API_URL, data);
}

export async function updateProduct(product: Product): Promise<void> {
  await axios.put(`${API_URL}/${product.Id}`, product);
}

export async function deleteProduct(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
