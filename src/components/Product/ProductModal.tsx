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
  onSubmit: (data: Omit<Product, "Id" | "CreatedAt" | "UpdatedAt">) => Promise<void>;
  initialData?: Product | null;
}

const ProductModal = ({ open, onClose, onSubmit, initialData }: ProductModalProps) => {
  const [formData, setFormData] = useState<Omit<Product, "Id" | "CreatedAt" | "UpdatedAt">>({
    Name: "",
    Description: "",
    Price: 0,
    Category: "",
    StockQuantity: 0,
    Status: "ATIVO",
  });

  useEffect(() => {
    if (initialData) {
      const { Id, CreatedAt, UpdatedAt, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        Name: "",
        Description: "",
        Price: 0,
        Category: "",
        StockQuantity: 0,
        Status: "ATIVO",
      });
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    if (!formData.Name || formData.Price <= 0) return;
    await onSubmit(formData);
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
          <div className="space-y-2">
            <Label htmlFor="Name">Nome *</Label>
            <Input
              id="Name"
              placeholder="Ex: Parafuso 10mm"
              value={formData.Name}
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Description">Descrição</Label>
            <Input
              id="Description"
              placeholder="Ex: Parafuso de aço inoxidável"
              value={formData.Description}
              onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Price">Preço *</Label>
              <Input
                id="Price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.Price}
                onChange={(e) => setFormData({ ...formData, Price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="StockQuantity">Estoque *</Label>
              <Input
                id="StockQuantity"
                type="number"
                placeholder="0"
                value={formData.StockQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, StockQuantity: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="Category">Categoria</Label>
            <Input
              id="Category"
              placeholder="Ex: Ferramentas"
              value={formData.Category}
              onChange={(e) => setFormData({ ...formData, Category: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.Status}
              onValueChange={(val) => setFormData({ ...formData, Status: val })}
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
