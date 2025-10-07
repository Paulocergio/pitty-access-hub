import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, DollarSign } from "lucide-react";
import { AccountsReceivable } from "@/types/AccountsReceivable/AccountsReceivable";

interface AccountsReceivableCardProps {
  account: AccountsReceivable;
  onEdit: (account: AccountsReceivable) => void;
  onDelete: (id: number) => void;
}

const AccountsReceivableCard = ({ account, onEdit, onDelete }: AccountsReceivableCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          {account.CustomerName}
        </CardTitle>
        <Badge
          className={
            account.Status?.toUpperCase() === "RECEBIDO"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }
        >
          {account.Status || "PENDENTE"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3 text-sm text-muted-foreground">
      <p>
        <strong>Valor:</strong> R$ {account.Amount?.toFixed(2)}
      </p>
      <p>
        <strong>Vencimento:</strong> {new Date(account.DueDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Descrição:</strong> {account.Description || "—"}
      </p>
      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(account)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(account.Id)}
          className="text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default AccountsReceivableCard;
