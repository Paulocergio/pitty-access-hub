import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/Product/Product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
        <Badge
          className={
            product.status?.toUpperCase() === "ATIVO"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {product.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p>Categoria: <span className="text-foreground">{product.category || "-"}</span></p>
        <p>Preço: <span className="text-foreground">R$ {product.saleprice.toFixed(2)}</span></p>
        <p>Estoque: <span className="text-foreground">{product.stockquantity}</span></p>
        <div className="flex gap-2 pt-3">
          <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
