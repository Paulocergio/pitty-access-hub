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
import { AccountsReceivable } from "@/types/AccountsReceivable/AccountsReceivable";

interface AccountsReceivableTableProps {
  accounts: AccountsReceivable[];
  onEdit: (account: AccountsReceivable) => void;
  onDelete: (id: number) => void;
}

const AccountsReceivableTable = ({ accounts, onEdit, onDelete }: AccountsReceivableTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Cliente</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.length > 0 ? (
            accounts.map((acc) => (
              <TableRow key={acc.Id} className="hover:bg-muted/30">
                <TableCell>{acc.CustomerName}</TableCell>
                <TableCell>{acc.Description}</TableCell>
                <TableCell>{acc.Amount?.toFixed(2)}</TableCell>
                <TableCell>{new Date(acc.DueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      acc.Status?.toUpperCase() === "RECEBIDO"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {acc.Status || "PENDENTE"}
                  </Badge>
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
              <TableCell colSpan={6} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2">
                  <DollarSign className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Nenhuma conta a receber encontrada
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

export default AccountsReceivableTable;
