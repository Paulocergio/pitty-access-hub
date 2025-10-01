export enum UserRole {
  Admin = 0,
  User = 1,
}
export interface Users {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;     
  password: string;
  isActive: boolean;
}
