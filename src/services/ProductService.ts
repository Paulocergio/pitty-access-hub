import { api } from "./api";
import { Product } from "@/types/Product/Product";

const URL = "/Product";

const toFront = (p: any): Product => ({
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

const toBack = (p: Product | Omit<Product,"id"|"createdat"|"updatedat">) => ({
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

export async function getProducts(): Promise<Product[]>{
  const { data } = await api.get(URL);
  return data.map(toFront);
}
export async function createProduct(data: Omit<Product,"id"|"createdat"|"updatedat">){
  await api.post(URL, toBack(data));
}
export async function updateProduct(id: number, data: Omit<Product,"id"|"createdat"|"updatedat">){
  await api.put(`${URL}/${id}`, toBack(data));
}
export async function deleteProduct(id: number){
  await api.delete(`${URL}/${id}`);
}
