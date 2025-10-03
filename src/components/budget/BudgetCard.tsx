import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText } from "lucide-react";
import { Budget } from "@/types/Budget/Budget";

interface BudgetCardProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (id: number) => void;
}

const BudgetCard = ({ budget, onEdit, onDelete }: BudgetCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3 flex items-center justify-between">
      <CardTitle className="text-lg flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Orçamento #{budget.Id}
      </CardTitle>
      <span className="text-purple-700 font-bold">
        R$ {budget.Total.toFixed(2)}
      </span>
    </CardHeader>
    <CardContent className="space-y-3 text-sm text-muted-foreground">
      <p><strong>Cliente:</strong> {budget.CustomerName}</p>
      <p><strong>Email:</strong> {budget.Email}</p>
      <p><strong>Telefone:</strong> {budget.Phone}</p>
      <p><strong>Data Emissão:</strong> {budget.IssueDate}</p>
      <p><strong>Data Vencimento:</strong> {budget.DueDate}</p>

      <div className="flex justify-end gap-2 pt-2 border-t">
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
    </CardContent>
  </Card>
);

export default BudgetCard;
