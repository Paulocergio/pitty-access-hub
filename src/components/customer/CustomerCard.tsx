import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Customer } from "@/types/Customer/Customer";
import formatPhone from "@/utils/formatPhone";

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

const CustomerCard = ({ customer, onEdit, onDelete }: CustomerCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          {customer.CompanyName}
        </CardTitle>
        <Badge
          className={
            customer.IsActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {customer.IsActive ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4" />
        <span className="truncate">{customer.Email || "—"}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="w-4 h-4" />
        {formatPhone(customer.Phone)}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        {customer.Address || "—"}, {customer.PostalCode || "—"}
      </div>

      {customer.ContactPerson && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          👤 {customer.ContactPerson}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t">
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
    </CardContent>
  </Card>
);

export default CustomerCard;
