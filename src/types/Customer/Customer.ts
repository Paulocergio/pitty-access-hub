export interface Customer {
  Id: number;
  DocumentNumber: string;
  CompanyName: string;
  Phone: string;
  Email: string;
  Address: string;
  PostalCode: string;
  ContactPerson?: string | null;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}
