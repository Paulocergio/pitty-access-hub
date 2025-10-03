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
import { Supplier } from "@/types/Users/Supplier/Supplier";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { fetchCnpj } from "@/services/brasilApiService";

interface SupplierModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Supplier, "Id" | "CreatedAt" | "UpdatedAt">) => Promise<void>;
  initialData?: Supplier | null;
}

const SupplierModal = ({ open, onClose, onSubmit, initialData }: SupplierModalProps) => {
  const [formData, setFormData] = useState<Omit<Supplier, "Id" | "CreatedAt" | "UpdatedAt">>({
    DocumentNumber: "",
    CompanyName: "",
    Address: "",
    Number: "",
    Neighborhood: "",
    City: "",
    State: "",
    PostalCode: "",
    Phone: "",
    RegistrationStatus: "ATIVA",
    BranchType: "",
    Email: "",
  });

  useEffect(() => {
    if (initialData) {
      const { Id, CreatedAt, UpdatedAt, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        DocumentNumber: "",
        CompanyName: "",
        Address: "",
        Number: "",
        Neighborhood: "",
        City: "",
        State: "",
        PostalCode: "",
        Phone: "",
        RegistrationStatus: "ATIVA",
        BranchType: "",
        Email: "",
      });
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    if (!formData.CompanyName || !formData.DocumentNumber) return;
    await onSubmit(formData);
  };

  const handleCnpjBlur = async () => {
    if (formData.DocumentNumber.length < 14) return;
    const data = await fetchCnpj(formData.DocumentNumber);
    if (data) {
      setFormData((prev) => ({
        ...prev,
        CompanyName: data.razao_social || prev.CompanyName,
        Address: data.logradouro || prev.Address,
        Number: data.numero || prev.Number,
        Neighborhood: data.bairro || prev.Neighborhood,
        City: data.municipio || prev.City,
        State: data.uf || prev.State,
        PostalCode: data.cep || prev.PostalCode,
        Phone: data.ddd_telefone_1 || prev.Phone,
        Email: data.email || prev.Email,
        RegistrationStatus: data.descricao_situacao_cadastral?.toUpperCase() || prev.RegistrationStatus,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Fornecedor" : "Novo Fornecedor"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="DocumentNumber">CNPJ *</Label>
            <Input
              id="DocumentNumber"
              placeholder="00.000.000/0000-00"
              value={formData.DocumentNumber}
              onChange={(e) => setFormData({ ...formData, DocumentNumber: e.target.value })}
              onBlur={handleCnpjBlur}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="CompanyName">Razão Social *</Label>
            <Input
              id="CompanyName"
              placeholder="Nome da empresa"
              value={formData.CompanyName}
              onChange={(e) => setFormData({ ...formData, CompanyName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              type="email"
              placeholder="email@exemplo.com"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Phone">Telefone</Label>
            <Input
              id="Phone"
              placeholder="(00) 00000-0000"
              value={formData.Phone}
              onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Address">Endereço</Label>
              <Input
                id="Address"
                placeholder="Rua"
                value={formData.Address}
                onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Number">Número</Label>
              <Input
                id="Number"
                placeholder="123"
                value={formData.Number}
                onChange={(e) => setFormData({ ...formData, Number: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Neighborhood">Bairro</Label>
              <Input
                id="Neighborhood"
                placeholder="Bairro"
                value={formData.Neighborhood}
                onChange={(e) => setFormData({ ...formData, Neighborhood: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="PostalCode">CEP</Label>
              <Input
                id="PostalCode"
                placeholder="00000-000"
                value={formData.PostalCode}
                onChange={(e) => setFormData({ ...formData, PostalCode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="City">Cidade</Label>
              <Input
                id="City"
                placeholder="Cidade"
                value={formData.City}
                onChange={(e) => setFormData({ ...formData, City: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="State">Estado</Label>
              <Input
                id="State"
                placeholder="UF"
                value={formData.State}
                onChange={(e) => setFormData({ ...formData, State: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Situação</Label>
              <Select
                value={formData.RegistrationStatus}
                onValueChange={(val) => setFormData({ ...formData, RegistrationStatus: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATIVA">Ativa</SelectItem>
                  <SelectItem value="INATIVA">Inativa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="BranchType">Tipo</Label>
              <Input
                id="BranchType"
                placeholder="Matriz/Filial"
                value={formData.BranchType}
                onChange={(e) => setFormData({ ...formData, BranchType: e.target.value })}
              />
            </div>
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

export default SupplierModal;