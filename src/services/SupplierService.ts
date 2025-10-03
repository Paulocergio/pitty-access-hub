import axios from "axios";
import { Supplier } from "@/types/Supplier/Supplier";

const API_URL = `${import.meta.env.VITE_API_URL}/Supplier`;

const mapToFront = (s: any): Supplier => ({
  Id: s.id,
  DocumentNumber: s.documentNumber,
  CompanyName: s.companyName,
  Address: s.address,
  Number: s.number,
  Neighborhood: s.neighborhood,
  City: s.city,
  State: s.state,
  PostalCode: s.postalCode,
  Phone: s.phone,
  RegistrationStatus: s.registrationStatus,
  BranchType: s.branchType,
  Email: s.email,
  CreatedAt: s.createdAt,
  UpdatedAt: s.updatedAt,
});

const mapToBack = (s: Supplier | Omit<Supplier, "Id">) => ({
  id: "Id" in s ? s.Id : undefined,
  documentNumber: s.DocumentNumber,
  companyName: s.CompanyName,
  address: s.Address,
  number: s.Number,
  neighborhood: s.Neighborhood,
  city: s.City,
  state: s.State,
  postalCode: s.PostalCode,
  phone: s.Phone,
  registrationStatus: s.RegistrationStatus,
  branchType: s.BranchType,
  email: s.Email,
  createdAt: "CreatedAt" in s ? s.CreatedAt : undefined,
  updatedAt: "UpdatedAt" in s ? s.UpdatedAt : undefined,
});

export const getSuppliers = async (): Promise<Supplier[]> => {
  const { data } = await axios.get(API_URL);
  const fornecedores = Array.isArray(data?.dados) ? data.dados : [];
  return fornecedores.map(mapToFront);
};

export const createSupplier = async (supplier: Omit<Supplier, "Id">) => {
  const payload = mapToBack(supplier);
  const { data } = await axios.post(API_URL, payload);
  return mapToFront(data.dados);
};

export const updateSupplier = async (supplier: Supplier) => {
  const payload = mapToBack(supplier);
  const { data } = await axios.put(`${API_URL}/${supplier.Id}`, payload);
  return mapToFront(data.dados);
};

export const deleteSupplier = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};