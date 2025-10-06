import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Building2 } from "lucide-react";
import { Customer } from "@/types/Customer/Customer";
import formatPhone from "@/utils/formatPhone";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

const SupplierTable = ({ customers, onEdit, onDelete }: CustomerTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Razão Social</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>CEP</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <TableRow key={customer.Id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{customer.CompanyName}</TableCell>
                <TableCell className="text-muted-foreground">
                  {customer.DocumentNumber}
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.Email || "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatPhone(customer.Phone)}
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.Address}</TableCell>
                <TableCell className="text-muted-foreground">{customer.PostalCode}</TableCell>
                <TableCell className="text-muted-foreground">
                  {customer.ContactPerson || "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      customer.IsActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {customer.IsActive ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(customer)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(customer.Id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Building2 className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Nenhum cliente encontrado</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
