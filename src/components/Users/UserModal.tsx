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
  onSubmit: (data: UserFormData) => Promise<void>;
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

  const [alterarSenha, setAlterarSenha] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        password: "",
        confirmarSenha: "",
        role: initialData.role,
        isActive: initialData.isActive,
      });
      setAlterarSenha(false);
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
      setAlterarSenha(true);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;

    try {
      const { confirmarSenha, ...userData } = formData;
      await onSubmit(userData as UserFormData);
      setEmailError(null);
    } catch (err: any) {
      if (err?.response?.status === 409 && err?.response?.data?.message) {
        setEmailError(err.response.data.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setEmailError(null);
              }}
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {initialData && (
            <div className="flex items-center gap-2">
              <input
                id="toggleSenha"
                type="checkbox"
                checked={alterarSenha}
                onChange={(e) => {
                  setAlterarSenha(e.target.checked);
                  if (!e.target.checked) {
                    setFormData({ ...formData, password: "", confirmarSenha: "" });
                  }
                }}
                className="h-4 w-4"
              />
              <Label htmlFor="toggleSenha">Alterar senha</Label>
            </div>
          )}

          {(!initialData || alterarSenha) && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar *</Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Acesso</Label>
              <Select
                value={formData.role.toString()}
                onValueChange={(val) => setFormData({ ...formData, role: Number(val) as UserRole })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Administrador</SelectItem>
                  <SelectItem value="1">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.isActive ? "true" : "false"}
                onValueChange={(val) => setFormData({ ...formData, isActive: val === "true" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Ativo</SelectItem>
                  <SelectItem value="false">Inativo</SelectItem>
                </SelectContent>
              </Select>
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

export default UserModal;
