import { api } from "./api";
import { Customer } from "@/types/Customer/Customer";

const BASE = "/api/Client";
const sanitize = (v: string) => v.replace(/\D/g, "");

const toFront = (s: any): Customer => ({
  Id: s.id,
  DocumentNumber: s.documentNumber,
  CompanyName: s.companyName,
  Phone: s.phone,
  Email: s.email,
  Address: s.address,
  PostalCode: s.postalCode,
  ContactPerson: s.contactPerson,
  IsActive: s.isActive,
  CreatedAt: s.createdAt,
  UpdatedAt: s.updatedAt,
});

const toBack = (s: Customer | Omit<Customer, "Id">, isCreate = false) => ({
  id: isCreate ? 0 : "Id" in s ? s.Id : 0,
  documentNumber: sanitize(s.DocumentNumber),
  companyName: s.CompanyName,
  phone: s.Phone,
  email: s.Email,
  address: s.Address,
  postalCode: s.PostalCode,
  contactPerson: s.ContactPerson ?? "",
  isActive: s.IsActive ?? true,
  createdAt: "CreatedAt" in s ? s.CreatedAt : new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export async function getCustomers(): Promise<Customer[]> {
  const { data } = await api.get(`${BASE}/get-all`);
  return Array.isArray(data) ? data.map(toFront) : [];
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  const { data } = await api.get(`${BASE}/get-by-id/${id}`);
  return data ? toFront(data) : null;
}

export async function createCustomer(customer: Omit<Customer, "Id">) {
  const { data } = await api.post(`${BASE}/create`, toBack(customer, true));
  return toFront(data);
}

export async function updateCustomer(customer: Customer) {
  const doc = sanitize(customer.DocumentNumber);
  const { data } = await api.put(`${BASE}/update-by-document/${doc}`, toBack(customer));
  return data; 
}

export async function deleteCustomer(id: number) {
  await api.delete(`${BASE}/delete/${id}`);
}
