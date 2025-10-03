import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Supplier } from "@/types/Users/Supplier/Supplier";
import formatPhone from "@/utils/formatPhone";

interface SupplierCardProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SupplierCard = ({ supplier, onEdit, onDelete }: SupplierCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          {supplier.CompanyName}
        </CardTitle>
        <Badge
          className={
            supplier.RegistrationStatus?.toUpperCase() === "ATIVA"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {supplier.RegistrationStatus || "Desconhecida"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4" />
        <span className="truncate">{supplier.Email}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="w-4 h-4" />
        {formatPhone(supplier.Phone)}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        {supplier.City}/{supplier.State}
      </div>
      <div className="flex justify-end gap-2 pt-2 border-t">
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
    </CardContent>
  </Card>
);

export default SupplierCard;