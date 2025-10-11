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
import { AccountsPayable } from "@/types/AccountsPayable/AccountsPayable";

interface AccountsPayableModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<AccountsPayable, "Id" | "CreatedAt" | "UpdatedAt">) => Promise<void>;
  initialData?: AccountsPayable | null;
}

const AccountsPayableModal = ({ open, onClose, onSubmit, initialData }: AccountsPayableModalProps) => {
  const [formData, setFormData] = useState<Omit<AccountsPayable, "Id" | "CreatedAt" | "UpdatedAt">>({
    SupplierName: "",
    Description: "",
    Amount: 0,
    DueDate: "",
    Status: "PENDENTE",
  });

  useEffect(() => {
    if (initialData) {
      const { Id, CreatedAt, UpdatedAt, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        SupplierName: "",
        Description: "",
        Amount: 0,
        DueDate: "",
        Status: "PENDENTE",
      });
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    if (!formData.SupplierName || !formData.Amount) return;
    await onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Conta a Pagar" : "Nova Conta a Pagar"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="SupplierName">Fornecedor *</Label>
            <Input
              id="SupplierName"
              placeholder="Ex: ABC Ltda"
              value={formData.SupplierName}
              onChange={(e) => setFormData({ ...formData, SupplierName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Description">Descrição</Label>
            <Input
              id="Description"
              placeholder="Ex: Compra de materiais"
              value={formData.Description}
              onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Amount">Valor *</Label>
              <Input
                id="Amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.Amount}
                onChange={(e) => setFormData({ ...formData, Amount: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="DueDate">Vencimento *</Label>
              <Input
                id="DueDate"
                type="date"
                value={formData.DueDate}
                onChange={(e) => setFormData({ ...formData, DueDate: e.target.value })}
              />
            </div>
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
                <SelectItem value="PENDENTE">Pendente</SelectItem>
                <SelectItem value="PAGA">Paga</SelectItem>
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

export default AccountsPayableModal;
