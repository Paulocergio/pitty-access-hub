import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, UserRole } from "@/types/Users/User";

type UserFormData = Omit<Users, "id"> & { confirmarSenha?: string };

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  initialData: Users | null;
}

const UserModal = ({ open, onClose, onSubmit, initialData }: UserModalProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmarSenha: "",
    role: UserRole.User,
    isActive: true,
  });

  // Preenche os campos ao editar
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        password: initialData.password,
        confirmarSenha: initialData.password,
        role: initialData.role,
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmarSenha: "",
        role: UserRole.User,
        isActive: true,
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("⚠️ Preencha todos os campos obrigatórios.");
      return;
    }
    if (formData.password !== formData.confirmarSenha) {
      alert("⚠️ As senhas não coincidem.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold">
            {initialData ? "Editar Usuário" : "Adicionar Usuário"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {initialData
              ? "Atualize as informações do usuário abaixo."
              : "Preencha os dados para criar um novo usuário."}
          </p>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Digite o nome completo"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Telefone
            </Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Senha e Confirmar Senha - SEMPRE LADO A LADO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha" className="text-sm font-medium">
                Confirmar Senha <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmarSenha"
                type="password"
                placeholder="••••••••"
                value={formData.confirmarSenha}
                onChange={(e) => handleChange("confirmarSenha", e.target.value)}
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Tipo de Acesso e Status - SEMPRE LADO A LADO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Tipo de Acesso
              </Label>
              <Select
                value={formData.role.toString()}
                onValueChange={(val) =>
                  handleChange("role", Number(val) as UserRole)
                }
              >
                <SelectTrigger id="role" className="transition-all focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0" className="cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Administrador
                    </span>
                  </SelectItem>
                  <SelectItem value="1" className="cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                      Usuário
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={formData.isActive ? "true" : "false"}
                onValueChange={(val) =>
                  handleChange("isActive", val === "true")
                }
              >
                <SelectTrigger id="status" className="transition-all focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true" className="cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Ativo
                    </span>
                  </SelectItem>
                  <SelectItem value="false" className="cursor-pointer">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Inativo
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 transition-colors shadow-sm"
          >
            {initialData ? "Salvar Alterações" : "Criar Usuário"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;