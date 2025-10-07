import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, DollarSign } from "lucide-react";
import { AccountsPayable } from "@/types/AccountsPayable/AccountsPayable";

interface AccountsPayableCardProps {
  account: AccountsPayable;
  onEdit: (account: AccountsPayable) => void;
  onDelete: (id: number) => void;
}

const AccountsPayableCard = ({ account, onEdit, onDelete }: AccountsPayableCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          {account.SupplierName}
        </CardTitle>
        <Badge
          className={
            account.Status?.toUpperCase() === "PAGO"
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

export default AccountsPayableCard;
