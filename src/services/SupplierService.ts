import axios from "axios";
import { Supplier } from "../types/Users/Supplier/Supplier";

const API_URL = `${import.meta.env.VITE_API_URL}/Supplier`;

export const getSuppliers = async (): Promise<Supplier[]> => {
  const { data } = await axios.get(API_URL);
  return Array.isArray(data) ? data : data?.dados || [];
};

export const createSupplier = async (supplier: Supplier) => {
  const { data } = await axios.post(API_URL, supplier);
  return data;
};

export const updateSupplier = async (supplier: Supplier) => {
  const { data } = await axios.put(`${API_URL}/${supplier.id}`, supplier);
  return data;
};

export const deleteSupplier = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
