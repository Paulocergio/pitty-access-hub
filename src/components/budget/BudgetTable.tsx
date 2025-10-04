import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Budget } from "@/types/Budget/Budget";

interface BudgetTableProps {
  budgets: Budget[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: number) => void;
}

const BudgetTable = ({ budgets, onEdit, onDelete }: BudgetTableProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

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
              <>
                {/* Linha principal */}
                <TableRow
                  key={budget.Id}
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => toggleExpand(budget.Id)}
                >
               <TableCell className="font-medium">{budget.BudgetNumber}</TableCell>

                  <TableCell>{budget.CustomerName}</TableCell>
                  <TableCell>{budget.Email}</TableCell>
                  <TableCell>{budget.Phone}</TableCell>
                  <TableCell>
                    {new Date(budget.IssueDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    {new Date(budget.DueDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-purple-700 font-semibold">
                    R$ {(Number(budget.Total) || 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(budget);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(budget.Id);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(budget.Id);
                        }}
                      >
                        {expandedRow === budget.Id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Linha expandida com itens */}
                {expandedRow === budget.Id && (
  <TableRow className="bg-gray-50">
    <TableCell colSpan={8}>
      <div className="p-3 border-t border-gray-200">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          Itens do Orçamento
        </h4>
        {budget.Items && budget.Items.length > 0 ? (
          <Table className="border rounded-md">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Descrição</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor Unitário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budget.Items.map((item) => (
                <TableRow key={item.Id}>
                  <TableCell>{item.Description}</TableCell>
                  <TableCell>{item.Quantity}</TableCell>
                  <TableCell>
                    R$ {(Number(item.UnitPrice) || 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-gray-500">
            Nenhum item cadastrado para este orçamento.
          </p>
        )}
      </div>
    </TableCell>
  </TableRow>
)}

              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Nenhum orçamento encontrado
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

export default BudgetTable;
