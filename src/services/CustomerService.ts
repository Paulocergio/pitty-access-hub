import axios from "axios";
import { Customer } from "@/types/Customer/Customer";

const API_URL = `${import.meta.env.VITE_API_URL}/Client`;

const sanitizeDocument = (doc: string) => doc.replace(/\D/g, "");

const mapToFront = (s: any): Customer => ({
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

const mapToBack = (s: Customer | Omit<Customer, "Id">, isCreate = false) => ({
  id: isCreate ? 0 : "Id" in s ? s.Id : 0,
  documentNumber: sanitizeDocument(s.DocumentNumber),
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

export const getCustomers = async (): Promise<Customer[]> => {
  const { data } = await axios.get(API_URL);
  return Array.isArray(data) ? data.map(mapToFront) : [];
};

export const createCustomer = async (customer: Omit<Customer, "Id">) => {
  const payload = mapToBack(customer, true);
  const { data } = await axios.post(API_URL, payload);
  return mapToFront(data);
};

export const updateCustomer = async (customer: Customer) => {
  const payload = mapToBack(customer);
  const { data } = await axios.put(`${API_URL}/${customer.Id}`, payload);
  return mapToFront(data);
};

export const deleteCustomer = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
