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
import { Customer } from "@/types/Customer/Customer";
import { fetchCnpj } from "@/services/brasilApiService"; 

interface CustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Customer, "Id" | "CreatedAt" | "UpdatedAt">) => Promise<void>;
  initialData?: Customer | null;
}

const SupplierModal = ({ open, onClose, onSubmit, initialData }: CustomerModalProps) => {
  const [formData, setFormData] = useState<Omit<Customer, "Id" | "CreatedAt" | "UpdatedAt">>({
    DocumentNumber: "",
    CompanyName: "",
    Phone: "",
    Email: "",
    Address: "",
    PostalCode: "",
    ContactPerson: "",
    IsActive: true,
  });

  useEffect(() => {
    if (initialData) {
      const { Id, CreatedAt, UpdatedAt, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        DocumentNumber: "",
        CompanyName: "",
        Phone: "",
        Email: "",
        Address: "",
        PostalCode: "",
        ContactPerson: "",
        IsActive: true,
      });
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    if (!formData.CompanyName || !formData.DocumentNumber) return;
    await onSubmit(formData);
  };

  // ✅ Validação CPF/CNPJ
  const handleDocumentBlur = async () => {
    const doc = formData.DocumentNumber.replace(/\D/g, "");

    if (doc.length === 11) {
      console.log("CPF detectado → preenchimento manual.");
    } else if (doc.length > 11) {
      const data = await fetchCnpj(doc);
      if (data) {
        setFormData((prev) => ({
          ...prev,
          CompanyName: data.razao_social || prev.CompanyName,
          Address: data.logradouro || prev.Address,
          PostalCode: data.cep || prev.PostalCode,
          Phone: data.ddd_telefone_1 || prev.Phone,
          Email: data.email || prev.Email,
        }));
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="DocumentNumber">CPF / CNPJ *</Label>
            <Input
              id="DocumentNumber"
              placeholder="Digite CPF ou CNPJ"
              value={formData.DocumentNumber}
              onChange={(e) =>
                setFormData({ ...formData, DocumentNumber: e.target.value })
              }
              onBlur={handleDocumentBlur}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="CompanyName">Nome / Razão Social *</Label>
            <Input
              id="CompanyName"
              value={formData.CompanyName}
              onChange={(e) =>
                setFormData({ ...formData, CompanyName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              type="email"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Phone">Telefone</Label>
            <Input
              id="Phone"
              value={formData.Phone}
              onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Address">Endereço</Label>
            <Input
              id="Address"
              value={formData.Address}
              onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="PostalCode">CEP</Label>
            <Input
              id="PostalCode"
              value={formData.PostalCode}
              onChange={(e) =>
                setFormData({ ...formData, PostalCode: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ContactPerson">Pessoa de Contato</Label>
            <Input
              id="ContactPerson"
              value={formData.ContactPerson}
              onChange={(e) =>
                setFormData({ ...formData, ContactPerson: e.target.value })
              }
            />
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

export default CustomerModal;
