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
import { Supplier } from "@/types/Users/Supplier/Supplier";
import formatPhone from "@/utils/formatPhone";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SupplierTable = ({ suppliers, onEdit, onDelete }: SupplierTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Razão Social</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Cidade/UF</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <TableRow key={supplier.Id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{supplier.CompanyName}</TableCell>
                <TableCell className="text-muted-foreground">{supplier.DocumentNumber}</TableCell>
                <TableCell className="text-muted-foreground">{supplier.Email}</TableCell>
                <TableCell className="text-muted-foreground">{formatPhone(supplier.Phone)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {supplier.City}/{supplier.State}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      supplier.RegistrationStatus?.toUpperCase() === "ATIVA"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {supplier.RegistrationStatus || "Desconhecida"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(supplier)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(supplier.Id)}
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
              <TableCell colSpan={7} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Building2 className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Nenhum fornecedor encontrado</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupplierTable;