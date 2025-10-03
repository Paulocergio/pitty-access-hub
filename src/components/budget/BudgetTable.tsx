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
import { Edit, Trash2, FileText } from "lucide-react";
import { Budget } from "@/types/Budget/Budget";

interface BudgetTableProps {
  budgets: Budget[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: number) => void;
}

const BudgetTable = ({ budgets, onEdit, onDelete }: BudgetTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Nº Orçamento</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data Emissão</TableHead>
            <TableHead>Data Vencimento</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <TableRow key={budget.Id} className="hover:bg-muted/30">
                <TableCell className="font-medium">#{budget.Id}</TableCell>
                <TableCell>{budget.CustomerName}</TableCell>
                <TableCell>{budget.Email}</TableCell>
                <TableCell>{budget.Phone}</TableCell>
                <TableCell>{budget.IssueDate}</TableCell>
                <TableCell>{budget.DueDate}</TableCell>
                <TableCell className="text-purple-700 font-semibold">
                  R$ {budget.Total.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(budget)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(budget.Id)}
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
              <TableCell colSpan={8} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Nenhum orçamento encontrado</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BudgetTable;
