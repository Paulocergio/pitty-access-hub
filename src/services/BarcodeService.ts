import axios from "axios";
import { Barcode } from "@/types/Barcode/Barcode";

const API_URL = "https://localhost:7274/api/Barcode";

export async function getBarcodes(): Promise<Barcode[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function createBarcode(data: Omit<Barcode, "Id">): Promise<void> {
  await axios.post(API_URL, data);
}

export async function updateBarcode(data: Barcode): Promise<void> {
  await axios.put(`${API_URL}/${data.Id}`, data);
}

export async function deleteBarcode(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
