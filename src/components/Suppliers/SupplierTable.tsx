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
import { Edit, Trash2, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Supplier } from "../../types/Users/Supplier/Supplier";
import formatPhone from "@/utils/formatPhone";

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SupplierTable = ({ suppliers = [], onEdit, onDelete }: SupplierTableProps) => {

  return (
    <div>
      {/* --- TABELA (DESKTOP) --- */}
   <div>
      {/* --- TABELA (DESKTOP) --- */}
      <div className="hidden md:block overflow-x-auto">
        <div className="rounded-lg border shadow-sm bg-white min-w-[900px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Razão Social</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cidade/UF</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(suppliers) && suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.companyName}</TableCell>
                    <TableCell>{supplier.documentNumber}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{formatPhone(supplier.phone)}</TableCell>
                    <TableCell>{supplier.city}/{supplier.state}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          supplier.registrationStatus?.toUpperCase() === "ATIVA"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {supplier.registrationStatus || "Desconhecida"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => onEdit(supplier)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onDelete(supplier.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    Nenhum fornecedor encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* --- LISTA (MOBILE) --- */}
      <div className="md:hidden space-y-4">
        {Array.isArray(suppliers) && suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <div key={supplier.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <h3 className="font-semibold">{supplier.companyName}</h3>
              <p>{supplier.documentNumber}</p>
              <p>{supplier.email}</p>
              <p>{formatPhone(supplier.phone)}</p>
              <p>{supplier.city}/{supplier.state}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border rounded-lg bg-white">
            <p className="text-muted-foreground">Nenhum fornecedor encontrado.</p>
          </div>
        )}
      </div>
    </div>

      {/* --- LISTA (MOBILE) --- */}
      <div className="md:hidden space-y-4">
        {suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {supplier.companyName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {supplier.documentNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Infos */}
              <div className="space-y-2 mb-4 pl-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="truncate">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{formatPhone(supplier.phone)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{supplier.city}/{supplier.state}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Badge
                  className={`font-medium ${
                    supplier.registrationStatus?.toUpperCase() === "ATIVA"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {supplier.registrationStatus || "Desconhecida"}
                </Badge>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(supplier)}
                    className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(supplier.id)}
                    className="h-9 w-9 text-destructive hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border rounded-lg bg-white">
            <p className="text-muted-foreground">Nenhum fornecedor encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierTable;
