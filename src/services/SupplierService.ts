import { api } from "./api";
import { Supplier } from "@/types/Supplier/Supplier";

const BASE = "/api/Supplier";

const toFront = (s: any): Supplier => ({
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

const toBack = (s: Supplier | Omit<Supplier, "Id">) => ({
  id: "Id" in s ? s.Id : 0, 
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
  createdAt: "CreatedAt" in s ? s.CreatedAt : new Date().toISOString(),
  updatedAt: "UpdatedAt" in s ? s.UpdatedAt : new Date().toISOString(),
});

export async function getSuppliers(): Promise<Supplier[]> {
  const { data } = await api.get(`${BASE}/get-all`);
  const rows = Array.isArray(data?.dados) ? data.dados : [];
  return rows.map(toFront);
}

export async function getSupplierById(id: number): Promise<Supplier | null> {
  const { data } = await api.get(`${BASE}/get-by-id/${id}`);
  return data ? toFront(data) : null;
}

export async function createSupplier(supplier: Omit<Supplier, "Id">) {
  const { data } = await api.post(`${BASE}/create`, toBack(supplier));
  return toFront(data?.dados ?? data);
}

export async function updateSupplier(supplier: Supplier) {
  const { data } = await api.put(`${BASE}/update/${supplier.Id}`, toBack(supplier));
  return data;
}

export async function deleteSupplier(id: number) {
  const { data } = await api.delete(`${BASE}/delete/${id}`);
  return data;
}
