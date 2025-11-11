import { api } from "./api";
import { Supplier } from "@/types/Supplier/Supplier";

const URL = "/Supplier";

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

const toBack = (s: Supplier | Omit<Supplier,"Id">) => ({
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

export async function getSuppliers(): Promise<Supplier[]>{
  const { data } = await api.get(URL);
  const rows = Array.isArray(data?.dados) ? data.dados : Array.isArray(data) ? data : [];
  return rows.map(toFront);
}
export async function createSupplier(supplier: Omit<Supplier,"Id">){
  const { data } = await api.post(URL, toBack(supplier));
  return toFront(data.dados ?? data);
}
export async function updateSupplier(supplier: Supplier){
  const { data } = await api.put(`${URL}/${supplier.Id}`, toBack(supplier));
  return toFront(data.dados ?? data);
}
export async function deleteSupplier(id: number){
  await api.delete(`${URL}/${id}`);
}
