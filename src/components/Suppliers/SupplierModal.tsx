import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Supplier } from "../../types/Users/Supplier/Supplier";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCnpj } from "@/services/brasilApiService";
interface SupplierModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Supplier, "id">) => void;
  initialData?: Supplier | null;
}

const SupplierModal = ({ open, onClose, onSubmit, initialData }: SupplierModalProps) => {
  const [formData, setFormData] = useState<Omit<Supplier, "id">>({
    documentNumber: "",
    companyName: "",
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    registrationStatus: "ATIVA",
    branchType: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        documentNumber: "",
        companyName: "",
        address: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        registrationStatus: "ATIVA",
        branchType: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };




const handleCnpjBlur = async () => {
  if (formData.documentNumber.length < 14) return;

  const data = await fetchCnpj(formData.documentNumber);
  if (data) {
    setFormData((prev) => ({
      ...prev,
      companyName: data.razao_social || prev.companyName,
      address: data.logradouro || prev.address,
      number: data.numero || prev.number,
      neighborhood: data.bairro || prev.neighborhood,
      city: data.municipio || prev.city,
      state: data.uf || prev.state,
      postalCode: data.cep || prev.postalCode,
      phone: data.ddd_telefone_1 || prev.phone,
      email: data.email || prev.email,
      registrationStatus: data.descricao_situacao_cadastral?.toUpperCase() || prev.registrationStatus,
    }));
  }
};


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">
            {initialData ? "Editar Fornecedor" : "Adicionar Fornecedor"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {initialData
              ? "Atualize as informações do fornecedor abaixo."
              : "Preencha os dados para cadastrar um novo fornecedor."}
          </p>
        </DialogHeader>

        <div className="grid gap-5 py-4">


          <div className="space-y-2">
  <Label htmlFor="documentNumber">CNPJ</Label>
  <Input
    id="documentNumber"
    placeholder="00.000.000/0000-00"
    value={formData.documentNumber}
    onChange={(e) => handleChange("documentNumber", e.target.value)}
    onBlur={handleCnpjBlur}
  />
</div>


          <div className="space-y-2">
            <Label htmlFor="companyName">Razão Social</Label>
            <Input
              id="companyName"
              placeholder="Digite a razão social"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </div>



          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="fornecedor@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          {/* Endereço */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Rua Exemplo"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                placeholder="123"
                value={formData.number}
                onChange={(e) => handleChange("number", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                placeholder="Centro"
                value={formData.neighborhood}
                onChange={(e) => handleChange("neighborhood", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">CEP</Label>
              <Input
                id="postalCode"
                placeholder="00000-000"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
              />
            </div>
          </div>

          {/* Cidade e Estado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="Digite a cidade"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                placeholder="UF"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
          </div>

          {/* Situação e Tipo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationStatus">Situação</Label>
              <Select
                value={formData.registrationStatus}
                onValueChange={(val) => handleChange("registrationStatus", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATIVA">Ativa</SelectItem>
                  <SelectItem value="INATIVA">Inativa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchType">Tipo</Label>
              <Input
                id="branchType"
                placeholder="Matriz / Filial"
                value={formData.branchType}
                onChange={(e) => handleChange("branchType", e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Criar Fornecedor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierModal;
