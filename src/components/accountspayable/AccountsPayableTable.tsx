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
import { Edit, Trash2, DollarSign } from "lucide-react";
import { AccountsPayable } from "@/types/AccountsPayable/AccountsPayable";

interface AccountsPayableTableProps {
  accounts: AccountsPayable[];
  onEdit: (account: AccountsPayable) => void;
  onDelete: (id: number) => void;
}

const AccountsPayableTable = ({ accounts, onEdit, onDelete }: AccountsPayableTableProps) => {
  const getStatusBadge = (acc: AccountsPayable) => {
    if (acc.Status?.toUpperCase() === "PAGO") {
      return <Badge className="bg-green-100 text-green-800">PAGO</Badge>;
    }

    if (acc.IsOverdue) {
      return <Badge className="bg-red-100 text-red-800">ATRASADA</Badge>;
    }

    return <Badge className="bg-yellow-100 text-yellow-800">PENDENTE</Badge>;
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Fornecedor</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead> {/* ✅ Agora vem antes */}
            <TableHead>Pagamento</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.length > 0 ? (
            accounts.map((acc) => (
              <TableRow key={acc.Id} className="hover:bg-muted/30">
                <TableCell>{acc.SupplierName}</TableCell>
                <TableCell>{acc.Description}</TableCell>
                <TableCell>{acc.Amount?.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(acc.DueDate).toLocaleDateString()}
                </TableCell>

                {/* ✅ Status primeiro */}
                <TableCell>{getStatusBadge(acc)}</TableCell>

                {/* ✅ Pagamento depois */}
                <TableCell>
                  {acc.PaymentDate
                    ? new Date(acc.PaymentDate).toLocaleDateString()
                    : "—"}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(acc)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(acc.Id)}
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
                  <DollarSign className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Nenhuma conta a pagar encontrada
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsPayableTable;
