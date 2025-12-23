import { useEffect, useMemo, useState } from "react";
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
import { AccountsPayable, AccountsPayableStatus } from "@/types/AccountsPayable/AccountsPayable";

interface AccountsPayableModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<AccountsPayable, "Id" | "CreatedAt" | "UpdatedAt">) => Promise<void>;
  initialData?: AccountsPayable | null;
}

const toDateInputValue = (value?: string | null) => {
  if (!value) return "";
  return value.length >= 10 ? value.slice(0, 10) : value;
};

const AccountsPayableModal = ({ open, onClose, onSubmit, initialData }: AccountsPayableModalProps) => {
  const [formData, setFormData] = useState<Omit<AccountsPayable, "Id" | "CreatedAt" | "UpdatedAt">>({
    SupplierName: "",
    Description: "",
    Amount: 0,
    DueDate: "",
    Status: "PENDENTE",
    PaymentDate: null,
    IsOverdue: false,
  });

  useEffect(() => {
    if (initialData) {
      const { Id, CreatedAt, UpdatedAt, ...rest } = initialData;
      setFormData({
        ...rest,
        DueDate: toDateInputValue(rest.DueDate),
        PaymentDate: toDateInputValue(rest.PaymentDate ?? null),
        Status: rest.Status as AccountsPayableStatus,
        IsOverdue: Boolean(rest.IsOverdue),
      });
    } else {
      setFormData({
        SupplierName: "",
        Description: "",
        Amount: 0,
        DueDate: "",
        Status: "PENDENTE",
        PaymentDate: null,
        IsOverdue: false,
      });
    }
  }, [initialData, open]);

  const isPaidSelected = useMemo(() => formData.Status === "PAGA", [formData.Status]);

  const handleSubmit = async () => {
    if (!formData.SupplierName?.trim()) return;
    if (!formData.Amount || formData.Amount <= 0) return;
    if (!formData.DueDate) return;

    // Se marcou como paga, exige data de pagamento
    if (isPaidSelected && !formData.PaymentDate) return;

    const payload = {
      ...formData,
      PaymentDate: isPaidSelected ? formData.PaymentDate : null,
      IsOverdue: false, // backend recalcula
    };

    await onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
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
                value={Number.isFinite(formData.Amount) ? formData.Amount : 0}
                onChange={(e) => setFormData({ ...formData, Amount: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="DueDate">Vencimento *</Label>
              <Input
                id="DueDate"
                type="date"
                value={toDateInputValue(formData.DueDate)}
                onChange={(e) => setFormData({ ...formData, DueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.Status}
              onValueChange={(val) => {
                const next = val as AccountsPayableStatus;
                setFormData({
                  ...formData,
                  Status: next,
                  PaymentDate: next === "PAGA" ? (formData.PaymentDate ?? "") : null,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="PENDENTE">Pendente</SelectItem>
                <SelectItem value="PAGA">Paga</SelectItem>
              </SelectContent>
            </Select>

            {initialData && initialData.Status === "ATRASADA" && (
              <p className="text-sm text-muted-foreground">Status atual: Atrasada</p>
            )}
          </div>

          {isPaidSelected && (
            <div className="space-y-2">
              <Label htmlFor="PaymentDate">Data de pagamento *</Label>
              <Input
                id="PaymentDate"
                type="date"
                value={toDateInputValue(formData.PaymentDate ?? "")}
                onChange={(e) => setFormData({ ...formData, PaymentDate: e.target.value })}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>{initialData ? "Salvar" : "Criar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountsPayableModal;
