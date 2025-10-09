import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Product } from "@/types/Product/Product";


interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, "id" | "createdat" | "updatedat">) => Promise<void>;
  initialData?: Product | null;
}

const ProductModal = ({ open, onClose, onSubmit, initialData }: ProductModalProps) => {
  const [formData, setFormData] = useState<Omit<Product, "id" | "createdat" | "updatedat">>({
    name: "",
    description: "",
    purchaseprice: 0,
    saleprice: 0,
    category: "",
    stockquantity: 0,
    status: "ATIVO",
    barcode: "",
  });

  useEffect(() => {
    if (initialData) {
      const { id, createdat, updatedat, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        name: "",
        description: "",
        purchaseprice: 0,
        saleprice: 0,
        category: "",
        stockquantity: 0,
        status: "ATIVO",
        barcode: "",
      });
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Ex: Parafuso 10mm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Código de Barras */}
          <div className="space-y-2">
            <Label htmlFor="barcode">Código de Barras *</Label>
            <Input
              id="barcode"
              placeholder="Ex: 7891234567890"
              value={formData.barcode}
              onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Parafuso de aço inoxidável"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Preço de Compra e Venda */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseprice">Preço de Compra *</Label>
              <Input
                id="purchaseprice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.purchaseprice}
                onChange={(e) =>
                  setFormData({ ...formData, purchaseprice: parseFloat(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saleprice">Preço de Venda *</Label>
              <Input
                id="saleprice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.saleprice}
                onChange={(e) =>
                  setFormData({ ...formData, saleprice: parseFloat(e.target.value) })
                }
              />
            </div>
          </div>

          {/* Estoque */}
          <div className="space-y-2">
            <Label htmlFor="stockquantity">Estoque *</Label>
            <Input
              id="stockquantity"
              type="number"
              placeholder="0"
              value={formData.stockquantity}
              onChange={(e) =>
                setFormData({ ...formData, stockquantity: parseInt(e.target.value) })
              }
            />
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              placeholder="Ex: Ferramentas"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData({ ...formData, status: val })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="INATIVO">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Margem estimada */}
          {formData.purchaseprice > 0 && formData.saleprice > 0 && (
            <div className="text-sm text-muted-foreground border-t pt-3">
              Margem estimada:{" "}
              <span className="font-medium text-green-600">
                {(
                  ((formData.saleprice - formData.purchaseprice) / formData.purchaseprice) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar" : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
